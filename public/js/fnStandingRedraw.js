/**
 * Redraw the table (i.e. `fnDraw`) to take account of sorting and filtering,
 * but retain the current pagination settings.
 *
 * DataTables 1.10+ provide the `dt-api draw()` method which has this ability
 * built-in (pass the first parameter to the function as `false`). As such this
 * method is marked deprecated, but is available for use with legacy version of
 * DataTables. Please use the new API if you are used DataTables 1.10 or newer.
 *
 *  @name fnStandingRedraw
 *  @summary Redraw the table without altering the paging
 *  @author Jonathan Hoguet
 *  @deprecated
 *
 *  @example
 *    $(document).ready(function() {
 *        var table = $('.dataTable').dataTable()
 *        table.fnStandingRedraw();
 *    } );
 */

jQuery.fn.dataTableExt.oApi.fnStandingRedraw = function(oSettings) {
    if(oSettings.oFeatures.bServerSide === false){
        var before = oSettings._iDisplayStart;

        oSettings.oApi._fnReDraw(oSettings);

        // iDisplayStart has been reset to zero - so lets change it back
        oSettings._iDisplayStart = before;
        oSettings.oApi._fnCalculateEnd(oSettings);
    }

    // draw the 'current' page
    oSettings.oApi._fnDraw(oSettings);
};

jQuery.fn.dataTableExt.oApi.fnFilterClear  = function ( oSettings )
{
	var i, iLen;

	/ Remove global filter /
	oSettings.oPreviousSearch.sSearch = "";

	/ Remove the text of the global filter in the input boxes /
	if ( typeof oSettings.aanFeatures.f != 'undefined' )
	{
		var n = oSettings.aanFeatures.f;
		for ( i=0, iLen=n.length ; i<iLen ; i++ )
		{
			$('input', n[i]).val( '' );
		}
	}

	/* Remove the search text for the column filters - NOTE - if you have input boxes for these
	 * filters, these will need to be reset
	 */
	for ( i=0, iLen=oSettings.aoPreSearchCols.length ; i<iLen ; i++ )
	{
		oSettings.aoPreSearchCols[i].sSearch = "";
	}

	/ Redraw /
	oSettings.oApi._fnReDraw( oSettings );
};

jQuery.fn.dataTableExt.oApi.fnSetFilteringDelay = function ( oSettings, iDelay ) {
	var _that = this;

	if ( iDelay === undefined ) {
		iDelay = 250;
	}

	this.each( function ( i ) {
		$.fn.dataTableExt.iApiIndex = i;
		var
			oTimerId = null,
			sPreviousSearch = null,
			anControl = $( 'input', _that.fnSettings().aanFeatures.f );

		anControl.unbind( 'keyup search input' ).bind( 'keyup search input', function() {

			if (sPreviousSearch === null || sPreviousSearch != anControl.val()) {
				window.clearTimeout(oTimerId);
				sPreviousSearch = anControl.val();
				oTimerId = window.setTimeout(function() {
					$.fn.dataTableExt.iApiIndex = i;
					_that.fnFilter( anControl.val() );
				}, iDelay);
			}
		});

		return this;
	} );
	return this;
};