/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de 
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */

 
/* requireJS module definition */
define(["jquery", "straight_line","Circle","Parametric_Curve","bezier_curve"],
       (function($, StraightLine, Circle, ParametricCurve, BezierCurve) {

    "use strict"; 
                
    /*
     * define callback functions to react to changes in the HTML page
     * and provide them with a closure defining context and scene
     */
    var HtmlController = function(context,scene,sceneController) {



        // generate random X coordinate within the canvas
        var randomX = function() { 
            return Math.floor(Math.random()*(context.canvas.width-10))+5; 
        };
            
        // generate random Y coordinate within the canvas
        var randomY = function() { 
            return Math.floor(Math.random()*(context.canvas.height-10))+5; 
        };

        // generate random Radius within the canvas
        var randomRadius = function() {

            var radius1 = (Math.random()* context.canvas.width);
            var radius2 = (Math.random()* context.canvas.height);

            var radius = Math.floor(Math.min(radius1,radius2));
            return radius;
        };

        // generate random color in hex notation
        var randomColor = function() {

            // convert a byte (0...255) to a 2-digit hex string
            var toHex2 = function(byte) {
                var s = byte.toString(16); // convert to hex string
                if(s.length == 1) s = "0"+s; // pad with leading 0
                return s;
            };
                
            var r = Math.floor(Math.random()*25.9)*10;
            var g = Math.floor(Math.random()*25.9)*10;
            var b = Math.floor(Math.random()*25.9)*10;
                
            // convert to hex notation
            return "#"+toHex2(r)+toHex2(g)+toHex2(b);
        };
        
        /*
         * event handler for "new line button".
         */
        $("#btnNewLine").click( (function() {
        
            // create the actual line and add it to the scene
            var style = { 
                width: Math.floor(Math.random()*3)+1,
                color: randomColor()
            };
                          
            var line = new StraightLine( [randomX(),randomY()], 
                                         [randomX(),randomY()], 
                                         style );
            scene.addObjects([line]);

            // deselect all objects, then select the newly created object
            sceneController.deselect();
            sceneController.select(line); // this will also redraw

        }));

        /*
         * event handler for "new circle button".
         */
        $("#btnNewCircle").click( (function() {

            // create the actual circle and add it to the scene
            var style = {
                width: Math.floor(Math.random()*3)+1,
                color: randomColor()
            };

            var circle = new Circle( [randomX(),randomY()],randomRadius(),style );
            scene.addObjects([circle]);


            // deselect all objects, then select the newly created object
            sceneController.deselect();
            sceneController.select(circle); // this will also redraw


        }));

        /*
        event handler to change the object line color
         */
        $("#inputColor").change(function(){
            sceneController.getSelectedObject().lineStyle.color = $("#inputColor").val() ;
            scene.draw(context);
        });

        /*
        event handler to change the object line width
         */
        $("#inputLineWidth").change(function(){
            sceneController.getSelectedObject().lineStyle.width = parseInt($("#inputLineWidth").val()) ;
            scene.draw(context);
        });

        // event handler to change the radius of a circle object
        $("#inputRadius").change(function(){
            sceneController.getSelectedObject().radius = parseInt($("#inputRadius").val()) ;
            scene.draw(context);
        });

        // event handler for "new Curve Button"
        $("#btnNewParametricCurve").click( (function(){

            var style = {
                width: $('#curve_line_width').val(),
                color: $('#curve_line_color').val()
            };

            var x_func = $('#curve_x').val();
            var y_func = $('#curve_y').val();
            var min_t = $('#min_t').val();
            var max_t = $('#max_t').val();
            var seg = $('#curve_segments').val();


           try{
            var parametricCurve = new ParametricCurve(style,x_func,y_func,min_t,max_t,seg);
           }catch (err){
               alert('On of the Formulas is wrong');
           }

            if(parametricCurve != undefined){
            scene.addObjects([parametricCurve]);


            // deselect all objects, then select the newly created object
            sceneController.deselect();
            sceneController.select(parametricCurve); // this will also redraw
            }

        //Handler to draw Bezier curve
         $("#btnNewBezierCurve").click(function(){

            // create the actual circle and add it to the scene
         var style = {
                width: Math.floor(Math.random()*3)+1,
                color: randomColor()
         };

         var point1 = [randomX(),randomY()];
         var point2 = [randomX(),randomY()];
         var point3 = [randomX(),randomY()];
         var point4 = [randomX(),randomY()];

         var seg = $("#bezier_segments").val();

         var beziercurve = new BezierCurve(style,point1,point2,point3,point4,seg);

         scene.addObjects([beziercurve]);


         // deselect all objects, then select the newly created object
         sceneController.deselect();
         sceneController.select(beziercurve); // this will also redraw

        });



        }));

        //handler to change the x coordinate function
        $("#curve_x").change(function(){
            if(check_x_function($("#curve_x").val())){
            if(sceneController.getSelectedObject()!= null){
            sceneController.getSelectedObject().x_func = $("#curve_x").val();
            }}
            //console.log(sceneController.getSelectedObject().x_func);
         });

        //handler to change the x coordinate function
        $("#curve_y").change(function(){
           if(check_y_function($("#curve_y").val())){
           if(sceneController.getSelectedObject()!= null){
            sceneController.getSelectedObject().y_func = $("#curve_y").val();
           }}
            //console.log(sceneController.getSelectedObject().y_func);
         });

        var check_x_function = function(x_function){
            try{
                var t = $('#min_t').val();
                eval(x_function);
            }catch(err){
                alert('Formula of x coordinate is wrong');
            return false;
            }
            return true;
        };

        var check_y_function = function(y_function){

            try{
                var t = $('#min_t').val();
                eval(y_function);
            }catch(err){
                alert('Formula of y coordinate is wrong');
                return false;
            }
            return true;
        };
    };


    // shows the values of the style variable of the object and radius in case of circle object
    HtmlController.prototype.showColorAndLineWidth = function(object){

        $("#inputColor").val(object.lineStyle.color);
        $("#inputLineWidth").val(object.lineStyle.width);
        if(object instanceof Circle){
        $("#inputRadius").val(object.radius);
         }
    };







    // return the constructor function
    return HtmlController;


})); // require 



            
