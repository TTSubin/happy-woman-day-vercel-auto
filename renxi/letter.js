(function () {
    var envelope = document.getElementById('letter-envelope');
    var letter = document.getElementById('love-letter');
    var title = document.getElementById('letter-title');
    var signButton = document.getElementById('letter-sign');
    var stamp = document.getElementById('receipt-stamp');
    var receiptStatus = document.getElementById('receipt-status');

    if (!envelope || !letter) return;

    if (signButton && stamp && receiptStatus) {
        signButton.addEventListener('click', function () {
            if (signButton.disabled) return;
            stamp.hidden = false;
            signButton.disabled = true;
            signButton.textContent = 'Đã ký nhận';
            receiptStatus.textContent = 'Bé Bu đã nhận thư. Em thương anh!';
        });
    }

    envelope.addEventListener('click', function () {
        if (letter.open) return;
        letter.showModal();
        document.documentElement.classList.add('letter-is-open');
        letter.scrollTop = 0;
        title.focus({ preventScroll: true });
    });

    letter.addEventListener('click', function (event) {
        // Only clicks outside the paper close the letter.
        if (event.target !== letter) return;
        var bounds = letter.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) {
            letter.close();
        }
    });

    letter.addEventListener('close', function () {
        document.documentElement.classList.remove('letter-is-open');
        envelope.focus({ preventScroll: true });
    });
})();
