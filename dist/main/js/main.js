var isActive = null;
$('.dropdown-toggle').dropdown()
$(document).ready(function () {
    if ($('[toggle-menu]').length > 0) {
        var toggleMenu = $('[toggle-menu]');
        var toggleListControl = []
        for (let val of toggleMenu) {
            toggleListControl.push($(val).attr('toggle-menu'))
        }
        for (let toggle of toggleListControl) {
            toggleMenuClass(toggle);
        }
    }
    $('#over').click(function (e) {
        e.preventDefault();
        $(`#${isActive}`).removeClass('active');
        $('#over').removeClass('active');
    })
    var currentID = null;
    $('[tabs-role]').find('[tab-action]').click((e) => {
        e.preventDefault();
        let id = e.currentTarget.hash.split('#')[1];
        var isTarget = $('#' + id);
        var op = 0;
        if (isTarget && id !== currentID) {
            var tabContent = $('[tabs-content] #' + id);
            console.log(tabContent)
            $('[tab-action]').removeClass('active show');
            $('[tabs-content]').find(`.active.show`).removeClass('active show');
            $(tabContent).addClass('active');
            $(isTarget).addClass('active')
            setTimeout(() => {
                $(isTarget).addClass('show')
                var opSet = setInterval(() => {
                    if (op <= 1) {
                        $(tabContent).attr('style', 'opacity:' + op);
                        op = op + 0.3;
                    } else {
                        $(tabContent).removeAttr('style');
                        clearInterval(opSet);
                        $(tabContent).addClass('show');
                    }
                }, 50);
            }, 400)
            currentID = id;
        }
    });
    $("#scrollTop").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
})


$(window).scroll(() => {
    let scroll = $(window).scrollTop();
    const heightSet = $(document).height()/3
    let scrollAction = true;
    if(scroll > 150){
        $('header').addClass('fixed')
    }else{
        $('header').removeClass('fixed')
    }
    if(scroll > heightSet){
        $('#scrollTop').removeClass('d-none');
    }else{
        $('#scrollTop').addClass('d-none');
    }
})


function toggleMenuClass(value) {
    let target = $(`[toggle-menu=${value}]`);
    target.click(function (e) {
        // e.preventDefault();
        isActive = value;
        if ($(target).attr('over') !== undefined) {
            $('#over').toggleClass('active');
        }
        $(`#${value}`).toggleClass('active');
    });
}
$(function () {
    var content = $('[jqueryScroll]')
    var idList = [];
    if (content.length > 0 && content !== undefined) {
        for (let val of content) {
            idList.push($(val).attr('id'))
        }
        for (let scrolls of idList) {
            let ps = new PerfectScrollbar(`#${scrolls}`, { suppressScrollX: true });
        }
    }
});
$('.--js_dropdown').hover(
    function () {
        var isTarget = $(this).find('.--sub_drop')
        $(isTarget).addClass('active');
        $(this).find('a').toggleClass('acitve')
        var i = 0;
        let callOp = setInterval(function () {
            if (i < 1) {
                $(isTarget).attr('style', `opacity: ${i}`)
                i += .3;
            } else {
                $(isTarget).removeAttr('style');
                $(isTarget).addClass('show');
                clearInterval(callOp)
            }
        }, 50)
    },
    function () {
        var isTarget = $(this).find('.--sub_drop')
        $(isTarget).removeClass('active show');
    }
);