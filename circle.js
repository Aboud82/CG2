/**
 * Created with JetBrains WebStorm.
 * User: aboud
 * Date: 4/8/13
 * Time: 5:39 PM
 * To change this template use File | Settings | File Templates.
 */

define(["util", "vec2", "scene", "point_dragger"],
    (function(Util,vec2,Scene,PointDragger) {

        "use strict";

        /**
         *   A simple circle

         * @param centerX is the x coordinate of the circle center
         * @param centerY is the y coordinate of the circle center
         * @param radius is the length of the radius of the circle
         * @param lineStyle object defining width and color attributes for line drawing,
         * @constructor
         */



        var Circle = function(center ,radius,lineStyle){

             console.log("creating circle  [ Center : " +
                 center[0] + "," + center[1] + "] Radius [ "+ radius +"]" );

             // draw style for drawing the circle
             this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };

             // initial values in case either circle values is undefined
             this.center = center;
             this.radius = radius;

         }


        // draw this circle into the provided 2D rendering context
        Circle.prototype.draw = function(context){


            context.beginPath();
            context.arc(this.center[0], this.center[1],this.radius,0,2*Math.PI);

            // set drawing style
            context.lineWidth = this.lineStyle.width;
            context.strokeStyle = this.lineStyle.color;

            context.stroke();
        };

        // test whether the mouse position is on this circle line
        Circle.prototype.isHit = function(context,pos){
           var mouseX = pos[0];
           var mouseY = pos[1];

           // distance between the circle center and the mouse position
           var distance_circleCenter_mousePosition = Math.floor(Math.sqrt(Math.pow(mouseX-this.center[0],2)+ Math.pow(mouseY- this.center[1],2)));

            if(distance_circleCenter_mousePosition < this.radius +2 &&
              distance_circleCenter_mousePosition > this.radius-2){
                return true;
            }else{
               return false;
            }

        }

        // return list of draggers to manipulate this center of the circle
        Circle.prototype.createDraggers = function() {

            var draggerStyle = { radius:4, color: this.lineStyle.color, width:0, fill:true }
            var draggers = [];

            // creates closure and callbacks for dragger
            var _circle = this;
            var getCenter = function() { return _circle.center; };
            var setCenter = function(dragEvent) { _circle.center = dragEvent.position;};
            draggers.push( new PointDragger(getCenter, setCenter, draggerStyle) );

            //creates circle line Dragger coordinates
           var getCircleLineDragger = function(){return  [_circle.center[0]+ _circle.radius,_circle.center[1]]};

            // manipulates the radius of the circle
            var setCircleDragger = function(dragEvent) {
                var newCircleDraggerPosition = dragEvent.position;
                _circle.radius = newCircleDraggerPosition[0]- _circle.center[0];

            };

            draggers.push( new PointDragger(getCircleLineDragger, setCircleDragger, draggerStyle) );

            return draggers;

        };
        // this module only exports the constructor for Circle objects
        return Circle;

    })); // define