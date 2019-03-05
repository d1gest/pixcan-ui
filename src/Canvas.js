import React from "react";

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            isZoomed: false,
            coordinates: [0, 0],
            context: {}
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleMove = this.handleMove.bind(this);
    }

    handleClick(e) {
        let scalechange = 3;
        let offsetX = -(e.nativeEvent.offsetX * scalechange);
        let offsetY = -(e.nativeEvent.offsetY * scalechange);
        let newCoord = [offsetX, offsetY];
        //let newCoord = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
        let ctx = this.canvasRef.current.getContext('2d');
        //ctx.scale(4,4);
        ctx.fillRect(e.pageX, e.pageY, 15, 15);
        //ctx.translate(e.pageX, e.pageY);
        //ctx.restore();
        //this.setState(state => ({context: ctx}));
        this.setState(state => ({isZoomed: !state.isZoomed, coordinates: newCoord}));
        console.log(e.pageX);
    }

    handleMove(e) {
        e.preventDefault();
        let newCoord = [e.pageX, e.pageY];
        //this.setState(() => ({coordinates: newCoord}));
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        var imageData = ctx.createImageData(2000, 2000);
        for (let i = 0; i < 100; i += 4) {
            imageData.data[i] = 255;  // red   color
            imageData.data[i + 1] = 0;  // green color
            imageData.data[i + 2] = 0;  // blue  color
            imageData.data[i + 3] = 255;
        }

        var canvasX = 25;
        var canvasY = 25;

        ctx.putImageData(imageData, canvasX, canvasY);

        for (var x = 0; x < 1920; x += 4) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 1080);
        }

        for (var y = 0; y < 1920; y += 4) {
            ctx.moveTo(0, y);
            ctx.lineTo(1920, y);
        }

        //ctx.strokeStyle='grey';
        ctx.stroke();

        ctx.scale(9, 3);
        ctx.fillStyle = 'red';
        ctx.fillRect(10, 10, 8, 20);

// Reset current transformation matrix to the identity matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);

// Non-scaled rectangle
        ctx.fillStyle = 'gray';
        ctx.fillRect(10, 10, 8, 20);

        this.setState(() => ({context: ctx}));


        //https://codepen.io/rachsmith/pen/ZObMOP?editors=0111
        //https://jsfiddle.net/drau/T4fqu/

        //draw react
        //https://codepen.io/Quinius/pen/OgxGQv?editors=0010
        //zoom canvas
        //https://codepen.io/techslides/pen/zowLd
    }

    render() {
        const zoomed = {
            //transform: `translate(${this.state.coordinates[0]},${this.state.coordinates[1]}) scale(40,40)`
            transform: `scale(4,4)`
        };
        const translate = {
            transform: `translate(${this.state.coordinates[0]}px,${this.state.coordinates[1]}px)`
            //transform: 'rotate(20deg)'
        };
        const notZoomed = {};
        console.log(zoomed);

        return (
            <div>
                <div id='canvdiv' style={this.state.isZoomed ? translate : notZoomed}>
                    <div style={this.state.isZoomed ? zoomed : notZoomed}>
                        <canvas ref={this.canvasRef} width={500} height={500} onClick={this.handleClick}
                                onMouseMove={this.handleMove} onWheel={this.handleWheel}/>
                    </div>
                </div>
                <output>X : {this.state.coordinates[0]} , Y : {this.state.coordinates[1]}</output>
            </div>
        )
    }

    handleWheel(e) {
        /*        e.preventDefault();
                let context = this.canvasRef.current.getContext('2d');
                // Get mouse offset.
                var mousex = e.clientX - canvas.offsetLeft;
                var mousey = e.clientY - canvas.offsetTop;
                // Normalize wheel to +1 or -1.
                var wheel = e.deltaY < 0 ? 1 : -1;

                // Compute zoom factor.
                var zoom = Math.exp(wheel*zoomIntensity);

                // Translate so the visible origin is at the context's origin.
                context.translate(originx, originy);

                // Compute the new visible origin. Originally the mouse is at a
                // distance mouse/scale from the corner, we want the point under
                // the mouse to remain in the same place after the zoom, but this
                // is at mouse/new_scale away from the corner. Therefore we need to
                // shift the origin (coordinates of the corner) to account for this.
                let originx -= mousex/(scale*zoom) - mousex/scale;
                let originy -= mousey/(scale*zoom) - mousey/scale;

                // Scale it (centered around the origin due to the trasnslate above).
                context.scale(zoom, zoom);
                // Offset the visible origin to it's proper position.
                context.translate(-originx, -originy);

                // Update scale and others.
        /!*        scale *= zoom;
                visibleWidth = width / scale;
                visibleHeight = height / scale;*!/*/
    }
}


export default Canvas;

