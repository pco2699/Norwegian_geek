var TextReceiver = (function() {
    Quiet.init({
        profilesPrefix: "/Norwegian_geek/cho_on_pa/js/",
        memoryInitializerPrefix: "/Norwegian_geek/cho_on_pa/js/",
        libfecPrefix: "/Norwegian_geek/cho_on_pa/js/"
    });
    var receivers;

    function onReceive(recvPayload, recvObj) {
        if(recvPayload != recvObj.content){
          recvObj.content = recvPayload;
          recvObj.target.textContent = Quiet.ab2str(recvObj.content);
        }
        recvObj.successes++;
        var total = recvObj.failures + recvObj.successes
        var ratio = recvObj.failures/total * 100;
        console.log("成功:" + recvObj.successes);
        recvObj.warningbox.textContent = "You may need to move the transmitter closer to the receiver and set the volume to 50%. Packet Loss: " + recvObj.failures + "/" + total + " (" + ratio.toFixed(0) + "%)";
    };

    function onReceiverCreateFail(reason, recvObj) {
        console.log("failed to create quiet receiver: " + reason);
        recvObj.warningbox.classList.remove("hidden");
        recvObj.warningbox.textContent = "Sorry, it looks like this example is not supported by your browser. Please give permission to use the microphone or try again in Google Chrome or Microsoft Edge."
    };

    function onReceiveFail(num_fails, recvObj) {
        recvObj.warningbox.classList.remove("hidden");
        recvObj.failures = num_fails;
        var total = recvObj.failures + recvObj.successes
        var ratio = recvObj.failures/total * 100;
        recvObj.warningbox.textContent = "You may need to move the transmitter closer to the receiver and set the volume to 50%. Packet Loss: " + recvObj.failures + "/" + total + " (" + ratio.toFixed(0) + "%)";
    };

    function onClick(e, recvObj) {
        e.target.disabled = true;
        var originalText = e.target.innerText;
        e.target.innerText = e.target.getAttribute('data-quiet-receiving-text');
        e.target.setAttribute('data-quiet-receiving-text', originalText);

        var receiverOnReceive = function(payload) { onReceive(payload, recvObj); };
        var receiverOnReceiverCreateFail = function(reason) { onReceiverCreateFail(reason, recvObj); };
        var receiverOnReceiveFail = function(num_fails) { onReceiveFail(num_fails, recvObj); };
        Quiet.receiver({profile: recvObj.profilename,
            onReceive: receiverOnReceive,
            onCreateFail: receiverOnReceiverCreateFail,
            onReceiveFail: receiverOnReceiveFail
        });

        recvObj.target.classList.remove('hidden');
    }

    function setupReceiver(receiver) {
        var recvObj = {
            profilename: receiver.getAttribute('data-quiet-profile-name'),
            btn: receiver.querySelector('[data-quiet-receive-text-button]'),
            target: receiver.querySelector('[data-quiet-receive-text-target]'),
            warningbox: receiver.querySelector('[data-quiet-receive-text-warning]'),
            successes: 0,
            failures: 0,
            content: new ArrayBuffer(0)
        };
        var onBtnClick = function(e) { return onClick(e, recvObj); };
        recvObj.btn.addEventListener('click', onBtnClick, false);
    };

    function onQuietReady() {
        for (var i = 0; i < receivers.length; i++) {
            setupReceiver(receivers[i]);
        }
        var allStartBtn = document.getElementById("all-btn");
        allStartBtn.addEventListener('click', onAllBtnClick, false);
    };

    function onQuietFail(reason) {
        console.log("quiet failed to initialize: " + reason);
        var warningbox = document.querySelector('[data-quiet-receive-text-warning]');
        warningbox.classList.remove("hidden");
        warningbox.textContent = "Sorry, it looks like there was a problem with this example (" + reason + ")";
    };

    function onDOMLoad() {
        receivers = document.querySelectorAll('[data-quiet-receive-text]');
        Quiet.addReadyCallback(onQuietReady, onQuietFail);
    };

    function onAllBtnClick(){
        document.getElementById("19000btn").click();
        document.getElementById("19200btn").click();
        document.getElementById("19400btn").click();
        document.getElementById("19600btn").click();
        document.getElementById("19800btn").click();
    }

    document.addEventListener("DOMContentLoaded", onDOMLoad);
})();
