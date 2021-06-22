var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Composites = Matter.Composites,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Composite = Matter.Composite,
Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
world = engine.world;

// create renderer
var render = Render.create({
element: document.body,
engine: engine,
options: {
    width: 1300,
    height: 450,
    wireframes: false,
    background: 'rgb(210, 173, 151)'
}
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
options = { 
    isStatic: true
};

// these static walls will not be rendered in this sprites example, see options
Composite.add(world, [

Bodies.rectangle(650, 450, 1300, 10, options),
Bodies.rectangle(1290, 200, 30, 500, options),
Bodies.rectangle(10, 200, 30, 500, options),
]);

var stack = Composites.stack(450, 20, 10, 4, 0, 0, function(x, y) {
if (Common.random() > 0.35) {
    return Bodies.rectangle(x, y, 50, 50, {
        render: {
            strokeStyle: '#ffffff',
            sprite: {
                texture: 'images/pencil.png',
                xScale: 0.7,
                yScale: 0.7
            }
        }
    });
} else {
    return Bodies.circle(x, y, 40, {
        density: 0.0005,
        frictionAir: 0.06,
        restitution: 0.3,
        friction: 0.01,
        render: {
            sprite: {
                texture: 'images/eraser.png',
                xScale: 0.7,
                yScale: 0.7
            }
        }
    });
}
});
Composite.add(world, stack);

   
 Composite.add(world, [
    // baskets
    Bodies.rectangle(1100, 350, 20, 350, options),
    Bodies.rectangle(200, 350, 20, 350, options),

 

    ]);
    

// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
