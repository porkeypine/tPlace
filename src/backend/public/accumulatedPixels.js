class accumulatedPixels {

    constructor(initialCount) {
        console.log("Initialising pixel count");
        // this.currentPixelCount = initialCount;
        this.MAX_PIXEL_COUNT = 10;
        this.currentPixelCount = 0;
    }

    addPixels(pixelsToAdd) {
        if (this.currentPixelCount + pixelsToAdd > this.MAX_PIXEL_COUNT) {
            this.currentPixelCount = this.MAX_PIXEL_COUNT;
            // console.log("No pixels added.");
        } else if (pixelsToAdd > 0) {
            this.currentPixelCount += pixelsToAdd;
            // console.log("Adding pixels: " + pixelsToAdd);
        } else {
            console.log("Cannot add negative pixels");
        }
    }

    subtractPixels(pixelsToRemove) {
        if (this.currentPixelCount - pixelsToRemove < 0) {
            console.log("ERROR");
        } else {
            this.currentPixelCount -= pixelsToRemove;
            // console.log("Removing pixels: " + pixelsToRemove);
        }
    }

    getPixels() {
        // console.log("Getting pixels: " + this.currentPixelCount);
        return this.currentPixelCount;
    }

    setPixels(pixelsToSetTo) {
        if (pixelsToSetTo > this.MAX_PIXEL_COUNT) {
            this.currentPixelCount = this.MAX_PIXEL_COUNT;
            // console.log("Setting to " + this.MAX_PIXEL_COUNT);
        } else {
            this.currentPixelCount = pixelsToSetTo;
            // console.log("Setting to " + this.currentPixelCount);
        }
    }

}


const ACCUMULATED_PIXEL_GAP = (5*60*1000);
