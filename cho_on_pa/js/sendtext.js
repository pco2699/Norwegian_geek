var TextTransmitter = (function() {
    Quiet.init({
      profilesPrefix: "/Norwegian_geek/cho_on_pa/js/",
      memoryInitializerPrefix: "/Norwegian_geek/cho_on_pa/js/",
      libfecPrefix: "/Norwegian_geek/cho_on_pa/js/"
    });
    var btn;
    var stp_btn;
    var selectbox;
    var textbox;
    var warningbox;
    var transmit;
    var send_continue_flag;

    function onTransmitFinish() {
        textbox.focus();
        btn.addEventListener('click', onClick, false);
        btn.disabled = false;
        var originalText = btn.innerText;
        btn.innerText = btn.getAttribute('data-quiet-sending-text');
        btn.setAttribute('data-quiet-sending-text', originalText);
    };
    function onTransmitFinishHint() {
        selectbox.focus();
        btn.addEventListener('click', onClick, false);
        btn.disabled = false;
        var originalText = btn.innerText;
        btn.innerText = btn.getAttribute('data-quiet-sending-text');
        btn.setAttribute('data-quiet-sending-text', originalText);
    };

    function onClick(e) {
      sendStop();
      console.log("send onClick");
        e.target.removeEventListener(e.type, arguments.callee);
        e.target.disabled = true;
        var originalText = e.target.innerText;
        e.target.innerText = e.target.getAttribute('data-quiet-sending-text');
        e.target.setAttribute('data-quiet-sending-text', originalText);
        var hint = textbox.value;
        if (hint === "") {
            onTransmitFinish();
            return;
        }
        var id = new Date().getTime().toString(16).substr(7, 10) + Math.floor(10*Math.random()).toString(16);
        var station = selectbox.value;
        if (station === "") {
            onTransmitFinishHint();
            return;
        }
        console.log(id);
        console.log(station);
        console.log(hint);
        var payload = id + "," + station + ","+ hint;
        console.log(payload);
        send_continue_flag = true;
        transmitAction(payload);
        console.log("cccccc");
        // transmit.transmit(Quiet.str2ab(payload));
    };

    function sendStop() {
      console.log("sendStop");
      send_continue_flag = false;
    }

    function transmitAction(payload) {
      console.log("aaaaa");
      var send_continue = function(){
        console.log("transmit_now");
        transmit.transmit(Quiet.str2ab(payload));
        if(send_continue_flag == false){
          return;
        }
        setTimeout(send_continue, 2000);
      }
      send_continue();
      console.log("bbbbbb");
      //
      // var send_continue =  setInterval(function(){
      //   console.log("transmit_now");
      //   transmit.transmit(Quiet.str2ab(payload));
      //   if(send_continue_flag == false){
      //     clearInterval(send_continue);
      //   }
      // }, 2000);
      // return true;
    }

    function onQuietReady() {
      console.log("QuietReady");
        var profilename = document.querySelector('[data-quiet-profile-name]').getAttribute('data-quiet-profile-name');
        transmit = Quiet.transmitter({profile: profilename, onFinish: onTransmitFinish});
        btn.addEventListener('click', onClick, false);
        stp_btn.addEventListener('click', sendStop, false);

    };

    function onQuietFail(reason) {
        console.log("quiet failed to initialize: " + reason);
        warningbox.classList.remove("hidden");
        warningbox.textContent = "Sorry, it looks like there was a problem with this example (" + reason + ")";
    };

    function onDOMLoad() {
      console.log("commit 3:07");
        btn = document.querySelector('[data-quiet-send-button]');
        stp_btn = document.querySelector('[data-quiet-send-stop-button]');
        selectbox = document.querySelector('[data-quiet-select-input]');
        textbox = document.querySelector('[data-quiet-text-input]');
        warningbox = document.querySelector('[data-quiet-warning]');
        Quiet.addReadyCallback(onQuietReady, onQuietFail);
    };

    document.addEventListener("DOMContentLoaded", onDOMLoad);
})();
