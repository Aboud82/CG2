/**
 * Created with JetBrains WebStorm.
 * User: aboud
 * Date: 4/26/13
 * Time: 3:30 PM
 * To change this template use File | Settings | File Templates.
 */
/* requireJS module definition */


define(["util", "vec2", "scene", "point_dragger","straight_line"],
    (function(Util,vec2,Scene,PointDragger, StraightLine) {

        "use strict";

        /**
         * a Parametric Curve Object
         *
         * @param lineStyle is the line color and width of the parametric curve
         * @param x_func is the function the determines the x coordinate of the parametric curve
         * @param y_func  is the function the determines the y coordinate of the parametric curve
         * @param min_t is the smallest value of the parametric curve range
         * @param max_t is the biggest value of the parametric curve range
         * @param seg is the number of segments of the parametric curve
         * @constructor
         */
        var ParametricCurve = function(lineStyle, x_func, y_func, min_t,max_t,seg){

            console.log("Creating a Parametric Curve : "+ "\n"
                +"x(t): " + x_func + " y(t): "+ y_func+ "\n"
                + "Min t: "+ min_t + " Max t: " +max_t + "\n"
                + "Segments: " + seg
            );

            // draw style for drawing the line
            this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };

            this.x_func = x_func;
            this.y_func = y_func;
            this.min_t = min_t;
            this.max_t = max_t;
            this.segments = seg;

            this.segmentsLines = [];

            var t = this.min_t;
            eval(this.x_func);
            eval(this.y_func);


        };

        /*
        to draw the parametric curve onto the provided 2D context
         */
        ParametricCurve.prototype.draw = function(context){

            var segmentsArray = [];

            for( var i = 0; i<= this.segments; i++){

                var t = this.min_t + i/this.segments *(this.max_t- this.min_t);

                var point = [eval(this.x_func),eval(this.y_func) ];
                segmentsArray[i] = point;
            }

            for(var i = 0; i< segmentsArray.length -1 ; i++){
                var straightLine = new StraightLine(segmentsArray[i],segmentsArray[i+1],this.lineStyle);
                straightLine.draw(context);
                this.segmentsLines[i]= straightLine;

            }
        };


        /*
        tests whether the mouse position is on the parametric curve
         */
        ParametricCurve.prototype.isHit = function(context,pos){
            for (var i=0; i< this.segmentsLines.length;i++){

                var sg = this.segmentsLines[i];

                if (sg.isHit(context,pos)== true){
                    alert('parametric curve hit');
                    return true;
               }
             }
             return false;
        };

        /*
        Parametric curve has no Draggers
         */
        ParametricCurve.prototype.createDraggers= function(){
            return [];
        };
        return ParametricCurve;
    })); // define