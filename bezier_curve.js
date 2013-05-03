/**
 * Created with JetBrains WebStorm.
 * User: aboud
 * Date: 4/29/13
 * Time: 10:19 AM
 * To change this template use File | Settings | File Templates.
 */
define(["util", "vec2", "scene", "point_dragger","parametric_curve", "bezier_dragger"],
    (function(Util,vec2,Scene,PointDragger, ParametricCurve, BezierDragger) {

        "use strict";

        /**
         * Bezier Object
         * @param style : line width and color of Bezier
         * @param point1: first point of Bezier
         * @param point2: second point of Bezier
         * @param point3: third point of Bezier
         * @param point4: fourth point of Bezier
         * @param seg: number of segments of Bezier
         * @constructor
         */

        var BezierCurve = function(style,point1,point2,point3,point4,seg){

        console.log("Creating a Bezier Curve : "+ "\n"
            +"point1: ["+ point1[0]+" , "+point1[1]+ "]\n"
            +"point2: ["+ point2[0]+" , "+point2[1]+ "]\n"
            +"point3: ["+ point3[0]+" , "+point3[1]+ "]\n"
            +"point4: ["+ point4[0]+" , "+point4[1]+ "]\n"
            + "Segments: " + seg
        );

        this.lineStyle = style;
        this.min_t = 0;
        this.max_t = 1;

        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.point4 = point4;


        //prepare the functions of Bezier Czrve with the coordinates of the 4 control points
        this.x_func = "Math.pow((1-t),3)*"+this.point1[0]+ "+3*Math.pow((1-t),2)*t*"+this.point2[0] +
            "+3*(1-t)*t*t*"+ this.point3[0]+" + Math.pow(t,3)*"+ this.point4[0];
        this.y_func =  "Math.pow((1-t),3)*"+this.point1[1]+ "+ 3*Math.pow((1-t),2)*t*"+this.point2[1]+
            "+3*(1-t)*t*t*"+this.point3[1]+ "+ Math.pow(t,3)*"+ this.point4[1];

        this.seg = seg;

        // Bezier Curve is a parametric curve
        this.parametricCurveOf_bezier = new ParametricCurve(this.lineStyle, this.x_func, this.y_func, this.min_t,this.max_t,this.seg);



    };

    // draw this circle into the provided 2D rendering context
    BezierCurve.prototype.draw = function(context){
               this.parametricCurveOf_bezier.draw(context);
    };

     // test whether the mouse position is on this Bezier
     BezierCurve.prototype.isHit = function(context,pos){
       return this.parametricCurveOf_bezier.isHit(context,pos);
     };

     /*
      Bezier Draggers
      */
      BezierCurve.prototype.createDraggers= function(){
          var draggerStyle = { radius:4, color: this.lineStyle.color, width:0, fill:true }
          var draggers = [];

          // create closure and callbacks for dragger
          var _bezier = this;
          var getP1 = function() { return _bezier.point1; };
          var getP2 = function() { return _bezier.point2; };
          var getP3 = function() { return _bezier.point3; };
          var getP4 = function() { return _bezier.point4; };

          var setP1 = function(dragEvent) { _bezier.point1 = dragEvent.position; moveControlPointsOfBezier(_bezier)};
          var setP2 = function(dragEvent) { _bezier.point2 = dragEvent.position; moveControlPointsOfBezier(_bezier)};
          var setP3 = function(dragEvent) { _bezier.point3 = dragEvent.position; moveControlPointsOfBezier(_bezier)};
          var setP4 = function(dragEvent) { _bezier.point4 = dragEvent.position; moveControlPointsOfBezier(_bezier)};


           draggers.push( new BezierDragger(_bezier,getP1, setP1, draggerStyle) );
           draggers.push( new BezierDragger(_bezier,getP2, setP2, draggerStyle) );
           draggers.push( new BezierDragger(_bezier,getP3, setP3, draggerStyle) );
           draggers.push( new BezierDragger(_bezier,getP4, setP4, draggerStyle) );


          return draggers;
       };

        // Change the position of the control points of the Bezier Object
        var moveControlPointsOfBezier = function(_bezier ){
            _bezier.parametricCurveOf_bezier.x_func = "Math.pow((1-t),3)*"+_bezier.point1[0]+ "+3*Math.pow((1-t),2)*t*"+_bezier.point2[0] +
                "+3*(1-t)*t*t*"+ _bezier.point3[0]+" + Math.pow(t,3)*"+ _bezier.point4[0];
            _bezier.parametricCurveOf_bezier.y_func =  "Math.pow((1-t),3)*"+_bezier.point1[1]+ "+ 3*Math.pow((1-t),2)*t*"+_bezier.point2[1]+
                "+3*(1-t)*t*t*"+_bezier.point3[1]+ "+ Math.pow(t,3)*"+ _bezier.point4[1];



        };

        return BezierCurve;
    })); // define