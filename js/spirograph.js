class Spirograph {
    constructor() {
        const canvas = document.getElementById('spirograph');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        this.context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;

        this.drawLoop = null;

        this.amp1 = null;
        this.freq1 = null;

        this.amp2 = null;
        this.freq2 = null;

        this.deg = null;

        this.oldX = null;
        this.oldY = null;
        this.first = null;

        this.centerLine = null;
        this.gravity = null;

        this.RGBd = null;
        this.RGBa = null;

        // console.log(this.centerX, this.centerY);
    }

    create() {
        this.newShape();
    }

    newShape() {
        clearInterval(this.drawLoop);
        this.clearC();
        this.first = true;
        this.deg = 0;
        this.freqM = Math.random() * 1000 + 100;

        this.amp1 = Math.random() * 200;
        this.freq1 = (Math.random() * 10 - 5) / this.freqM;

        this.amp2 = Math.random() * 200;
        this.freq2 = (Math.random() * 10 - 5) / this.freqM;

        this.RGBa = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.newRGBd();

        this.centerLine = Math.floor(Math.random() * 2);

        if (Math.floor(Math.random() * 2)) {
            this.gravity = (Math.random() * 3 + 1) / 1500;
        } else {
            this.gravity = 0;
        }
        this.drawLoop = setInterval(() => this.draw(), 50);
    }

    newRGBd() {
        this.RGBd = [this.RGBa[0] + Math.floor(Math.random() * this.colorRange - (this.colorRange / 2)), this.RGBa[0] + Math.floor(Math.random() * this.colorRange - (this.colorRange / 2)), this.RGBa[0] + Math.floor(Math.random() * this.colorRange - (this.colorRange / 2))];
    }

    draw() {
        for (let i = 0; i < 50; i++) {
            this.deg++;

            if (this.gravity) {
                this.amp1 -= this.gravity;
                this.amp2 -= this.gravity;
                if (this.amp1 < 0) {
                    this.stopDraw();
                    break;
                }
            }

            let xA = this.centerX + this.amp1 * Math.sin(this.freq1 * this.deg * -2 * Math.PI);
            let yA = this.centerY + this.amp1 * Math.cos(this.freq1 * this.deg * 2 * Math.PI);

            let x = xA + this.amp2 * Math.sin(this.freq2 * this.deg * 2 * Math.PI);
            let y = yA + this.amp2 * Math.cos(this.freq2 * this.deg * 2 * Math.PI);

            if (this.first) {
                this.first = false;
                this.oldX = x;
                this.oldY = y;
            }

            this.context.shadowColor = 'rgb(' + this.colorUpdate(0) + ',' + this.colorUpdate(1) + ',' + this.colorUpdate(2) + ')';
            this.context.beginPath();
            this.context.moveTo(this.oldX, this.oldY);
            this.context.lineTo(x, y);
            this.context.lineWidth = .5;
            this.context.strokeStyle = 'rgb(' + this.colorUpdate(0) + ',' + this.colorUpdate(1) + ',' + this.colorUpdate(2) + ')';
            this.context.stroke();


            if (this.centerLine) {
                this.context.beginPath();
                this.context.moveTo(this.centerX, this.centerY);
                this.context.lineTo(x, y);
                this.context.lineWidth = .01;
                this.context.strokeStyle = 'rgb(' + this.colorUpdate(0) + ',' + this.colorUpdate(1) + ',' + this.colorUpdate(2) + ')';
                this.context.stroke();
            }

            this.oldX = x;
            this.oldY = y;

        }
        if (this.deg > 10000 && !this.gravity) {
            this.stopDraw();
        }
    }

    stopDraw() {
        clearInterval(this.drawLoop);
    }

    colorUpdate(i) {
        if (Math.abs(this.RGBd[i] - this.RGBa[i]) < 1) {
            this.RGBa[i] = this.RGBd[i];
        } else if (this.RGBd[i] > this.RGBa[i]) {
            this.RGBa[i] += this.colorSpeed;
        } else if (this.RGBd[i] < this.RGBa[i]) {
            this.RGBa[i] -= this.colorSpeed;
        }

        if (this.RGBa[i] > 255) {
            this.RGBa[i] = 255;
        } else if (this.RGBa[i] < 0) {
            this.RGBa[i] = 0;
        }

        if (Math.abs(this.RGBd[0] - this.RGBa[0]) < 1 && Math.abs(this.RGBd[1] - this.RGBa[1]) < 1 && Math.abs(this.RGBd[2] - this.RGBa[2]) < 1) {
            this.newRGBd();
        }

        return Math.floor(this.RGBa[i]);
    }

    clearC() {
        this.context.globalCompositeOperation = "copy";
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.canvasW, this.canvasH);
        this.context.globalCompositeOperation = "lighter";
    }
}