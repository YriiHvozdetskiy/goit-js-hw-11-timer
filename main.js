const refs = {
    clockface: document.querySelector('.js-clockface'),
};

class CountdownTimer {
    constructor({ onTick }) {
        this.onTick = onTick;
        this.targetDate = new Date('Aug 31, 2021');
        this.interval = null;
    }

    getTimeComponents(time) {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    interval = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = this.targetDate - currentTime;
        const time = this.getTimeComponents(deltaTime);
        this.onTick(time);
    }, 1000);
}

const time = new CountdownTimer({ onTick: updateClockface });

function updateClockface({ days, hours, mins, secs }) {
    refs.clockface.textContent = `${days}дн:${hours}год:${mins}хв:${secs}сек`;
}
