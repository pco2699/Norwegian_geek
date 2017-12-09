var TextTransmitter = (function() {
    Quiet.init({
      profilesPrefix: "/Norwegian_geek/cho_on_pa/js/",
      memoryInitializerPrefix: "/Norwegian_geek/cho_on_pa/js/",
      libfecPrefix: "/Norwegian_geek/cho_on_pa/js/"
    });
    var btn;
    var stp_btn;
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

    function onClick(e) {
      console.log("send onClick");
        e.target.removeEventListener(e.type, arguments.callee);
        e.target.disabled = true;
        var originalText = e.target.innerText;
        e.target.innerText = e.target.getAttribute('data-quiet-sending-text');
        e.target.setAttribute('data-quiet-sending-text', originalText);
        var payload = textbox.value;
        if (payload === "") {
            onTransmitFinish();
            return;
        }
        console.log("111111111");
        send_continue_flag = true;
        transmitAction(payload);
        // transmit.transmit(Quiet.str2ab(payload));
    };

    function sendStop() {
      console.log("sendStop");
      send_continue_flag = false;
    }

    function transmitAction(payload) {
      var send_continue = function(){
        console.log("transmit_now");
        transmit.transmit(Quiet.str2ab(payload));
        if(send_continue_flag == false){
          return;
        }
        setTimeout(send_continue, 2000);
      }
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
      console.log("commit 1:05");
        btn = document.querySelector('[data-quiet-send-button]');
        stp_btn = document.querySelector('[data-quiet-send-stop-button]');
        textbox = document.querySelector('[data-quiet-text-input]');
        warningbox = document.querySelector('[data-quiet-warning]');
        Quiet.addReadyCallback(onQuietReady, onQuietFail);
    };

    document.addEventListener("DOMContentLoaded", onDOMLoad);
})();
