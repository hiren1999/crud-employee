//this function is used to call confirmation
function deleteRecord(delete_path,title,text,token,table,type,id)
{
    swal({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel it!",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function(isConfirm) {
        if (isConfirm) {
            deleteRequest(delete_path,id,token);
        } 
    });
}
function updateRecord(delete_path,title,text,token,table,type,id)
{
    swal({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel it!",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function(isConfirm) {
        if (isConfirm) {
            deleteRequest(delete_path,id,token);
        } 
    });
}
//this function  is used to check coming data is array or not
function checkLength(delete_id)
{
    var selected_length = delete_id.size();

    if(0 == selected_length){
        EmptyData();
    }else{
        var id = [];
        $.each(delete_id, function(i, ele){
            id.push($(ele).val());
        });
        deleteRecord(delete_path,title,text,token,table,type,id)
    }
}
//this function  is used to call delete record
function deleteRequest(delete_path,id,token)
{
    $.ajax({
        url: delete_path,
        type:'post',
        dataType:'json',
        data:{id:id,_token: token},
        beforeSend:function(){
            $('div.overlay').show();
        },
        complete:function(){
            $('div.overlay').hide();
            var redrawtable = $('#'+table).dataTable();
                redrawtable.fnStandingRedraw();
        },
        success: function (respObj) {
            if (respObj) {
                $('.number-delete').hide();
                toastr.success('Record deleted Successfully');
            };
        }
    });
}
//Give Error when no data is selected
function EmptyData(){
    swal({
       title: "Please Select a Record to Delete",
       type:"error",
       timer: 2000,
       showConfirmButton: false 
    });
}

function ActcheckLength(delete_id)
{
    var selected_length = delete_id.size();
    if(0 == selected_length){
        ActEmptyData();
    }else{
        var id = [];
        $.each(delete_id, function(i, ele){
            id.push($(ele).val());
        });

    activate(active_path,title1,text,token,table,type,id)

    }
}

function DeactcheckLength(delete_id)
{
    var selected_length = delete_id.size();

    if(0 == selected_length){
        DeactEmptyData();
    }else{
        var id = [];
        $.each(delete_id, function(i, ele){
            id.push($(ele).val());
        });
        deactivate(deactive_path,title2,text,token,table,type,id);
    }
}

function ActEmptyData(){
    swal({
       title1: "Please select a Record to Active",
       type:"error",
       timer: 2000,
       showConfirmButton: false 
    });
}

function DeactEmptyData(){
    swal({
       title2: "Please select a Record to Deactive",
       type:"error",
       timer: 2000,
       showConfirmButton: false 
    });
}

function activate(active_path,title1,text,token,table,type,id)
{
    swal({
        title: title1,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonText: "Yes, activate it!",
        cancelButtonText: "No, cancel it!",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function(isConfirm) {
        if (isConfirm) {
            activateRequest(active_path,id,token);
        } 
    });
}

function deactivate(deactive_path,title2,text,token,table,type,id)
{
    swal({
        title: title2,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonText: "Yes, deactivate it!",
        cancelButtonText: "No, cancel it!",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function(isConfirm) {
        if (isConfirm) {
            deactivateRequest(deactive_path,id,token);
        } 
    });
}

function activateRequest(active_path,id,token)
{
    $.ajax({
        url: active_path,
        type:'post',
        dataType:'json',
        data:{id:id,_token: token},
        beforeSend:function(){
            $('div.overlay').show();
        },
        complete:function(){
            $('div.overlay').hide();
            var redrawtable = $('#'+table).dataTable();
                redrawtable.fnStandingRedraw();
        },
        success: function (respObj) {    
            if (respObj) {
                toastr.success('Record Activated Successfully');
            };
        }
    });
}

function deactivateRequest(deactive_path,id,token)
{
    $.ajax({
        url: deactive_path,
        type:'post',
        dataType:'json',
        data:{id:id,_token: token},
        beforeSend:function(){
            $('div.overlay').show();
        },
        complete:function(){
            $('div.overlay').hide();
            var redrawtable = $('#'+table).dataTable();
                redrawtable.fnStandingRedraw();
        },
        success: function (respObj) {
            if (respObj) {
                toastr.success('Record Deactivated Successfully');
            };
        }
    });
}