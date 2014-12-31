// Type definitions for Matter physics engine http://brm.io/matter-js/
// Project: https://github.com/liabru/matter-js
// Rev 31/12/2014

declare module Matter {

    export interface ICollisionFilter {
        category?: number;
        mask?: number;
        group?: number;
    }

    export interface IRenderer {
        visible?: boolean;
        sprite?: {
            texture?: string;
            xScale?: number;
            yScale?: number;
        };
        lineWidth?: number;
        fillStyle?: string;
        strokeStyle?: string;
    }

    export interface IEvent {
        timestamp: number;
        source: any;
        name: string;
    }

    export interface IBodyOptions {

        id: number;
        type?: string;
        label?: string;
        angle?: number;
        vertices: Vertices;
        position?: Vector;
        force?: Vector;
        torque?: number;
        positionImpulse: Vector;
        constraintImpulse: { x: number; y: number; angle: number; };
        speed: number;
        angularSpeed: number;
        velocity: Vector;
        angularVelocity: number;
        isStatic: boolean;
        isSleeping: boolean;
        motion: number;
        sleepThreshold: number;
        density: number;
        restitution: number;
        friction: number;
        frictionAir: number;
        collisionFilter: ICollisionFilter;
        slop: number;
        timeScale: number;
        render: IRenderer;

    }

    export class Body {

        static create(options: IBodyOptions): Body;
        static nextGroup(isNonColliding?: boolean): number;
        static setStatic(body: Body, isStatic: boolean): void;
        static setDensity(body: Body, density: number): void;
        static setInertia(body: Body, inertia: number): void;
        static setVertices(body: Body, vertices: Vector[]): void;
        static setPosition(body: Body, position: Vector): void;
        static setAngle(body: Body, angle: number): void;
        static setVelocity(body: Body, velocity: Vector): void;
        static setAngularVelocity(body: Body, velocity: number): void;
        static translate(body: Body, translation: Vector): void;
        static rotate(body: Body, rotation: number): void;
        static scale(body: Body, scaleX: number, scaleY: number, point?: Vector): void;
        static resetForcesAll(bodies: Body[]): void;
        static applyGravityAll(bodies: Body[], gravity: Vector): void;
        static updateAll(bodies: Body[], deltaTime: number, timeScale: number, correction: number, worldBounds: Bounds): void;
        static update(body: Body, deltaTime: number, timeScale: number, correction: number): void;
        static applyForce(body: Body, position: Vector, force: Vector): void;
        static set(body: Body, settings: any, value: any): void;

        id: number;
        type: string;
        label: string;
        angle: number;
        vertices: Vector[];
        position: Vector;
        force: Vector;
        torque: number;
        speed: number;
        angularSpeed: number;
        velocity: Vector;
        angularVelocity: Vector;
        isStatic: boolean;
        isSleeping: boolean;
        motion: number;
        sleepThreshold: number;
        density: number;
        mass: number;
        inverseMass: number;
        inertia: number;
        inverseInertia: number;
        restitution: number;
        friction: number;
        frictionAir: number;
        collisionFilter: ICollisionFilter;
        slop: number;
        timeScale: number;
        render: IRenderer;
        axes: Axes;
        area: string;
        bounds: Bounds;

    }

    export interface ICompositeOptions {

        id?: number;
        type?: string;
        parent?: Composite;
        isModified?: boolean;
        bodies?: Body[];
        constraints?: Constraint[];
        composites?: Composite[];
        label?: string;

    }

    export class Composite {

        static create(options: ICompositeOptions): Composite;
        static setModified(composite: Composite, isModified: boolean, updateParents?: boolean, updateChildren?: boolean): void;
        static add(composite: Composite, object: Body): Composite;
        static add(composite: Composite, object: Body[]): Composite;
        static add(composite: Composite, object: Constraint): Composite;
        static add(composite: Composite, object: Constraint[]): Composite;
        static add(composite: Composite, object: Composite): Composite;
        static add(composite: Composite, object: Composite[]): Composite;
        static remove(composite: Composite, object: Body, deep?: boolean): Composite;
        static remove(composite: Composite, object: Body[], deep?: boolean): Composite;
        static remove(composite: Composite, object: Constraint, deep?: boolean): Composite;
        static remove(composite: Composite, object: Constraint[], deep?: boolean): Composite;
        static remove(composite: Composite, object: Composite, deep?: boolean): Composite;
        static remove(composite: Composite, object: Composite[], deep?: boolean): Composite;
        static addComposite(compositeA: Composite, compositeB: Composite): Composite;
        static removeComposite(compositeA: Composite, compositeB: Composite, deep?: boolean): Composite;
        static removeCompositeAt(composite: Composite, position: number): Composite;
        static addBody(composite: Composite, body: Body): Composite;
        static removeBody(composite: Composite, body: Body, deep?: boolean): Composite;
        static removeBodyAt(composite: Composite, position: number): Composite;
        static addConstraint(composite: Composite, constraint: Constraint): Composite;
        static removeConstraint(composite: Composite, constraint: Constraint, deep?: boolean): Composite;
        static removeConstraintAt(composite: Composite, position: number): Composite;
        static clear(composite: Composite, keepStatic: boolean, deep?: boolean): Composite;
        static allBodies(composite: Composite): Body[];
        static allConstraints(composite: Composite): Constraint[];
        static allComposites(composite: Composite): Composite[];
        static get(composite: Composite, id: number, type: string): any;
        static move(compositeA: Composite, objects: any[], compositeB: Composite): Composite;
        static rebase(composite: Composite): Composite;
        static translate(composite: Composite, translation: Vector, recursive?: boolean): Composite;
        static rotate(composite: Composite, rotation: number, point: Vector, recursive?: boolean): Composite;
        static scale(composite: Composite, scaleX: number, scaleY: number, point: Vector, recursive?: boolean): Composite;

        id: number;
        type: string;
        label: string;
        isModified: boolean;
        parent: Composite;
        bodies: Body[];
        constraints: Constraint[];
        composites: Composite[];

        //events
        beforeAdd: (event: IEvent) => void;
        afterAdd: (event: IEvent) => void;
        beforeRemove: (event: IEvent) => void;
        afterRemove: (event: IEvent) => void;

    }

    export interface ICollision {
        axisNumber?: number;
        collided?: boolean;
        bodyA?: Body;
        bodyB?: Body;
        normal?: Vector;
        depth?: number;
        tangent?: Vector;
        peneration?: Vector;
        supports: any[];
        supportCorrected: Vector;

    }

    export interface IWorldOptions {
        label?: string;
        gravity?: Vector;
        bounds?: Bounds;
    }

    export class World extends Composite {

        static create(options: IWorldOptions): World;
        static clear(world: World, keepStatic: boolean): World;
        static addComposite(world: World, composite: Composite): World;
        static addBody(world: World, body: Body): World;
        static addConstraint(world: World, constraint: Constraint): World;

    }

    export class Contact {

        static create(vertex: any): Contact;

        id: number;
        vertex: any;
        normalImpulse: number;
        tangentImpulse: number;

    }

    export class Detector {

        static collisions(broadphasePairs: Pair[], engine: Engine): ICollision[];
        static bruteForce(bodies: Body[], engine: Engine): ICollision[];
        static canCollide(filterA: ICollisionFilter, filterB: ICollisionFilter): boolean;

    }

    export interface IGridOptions {

        controller?: Grid;
        detector?: ICollision[];
        buckets?: any;
        pairs?: any;
        pairsList?: any[];
        bucketWidth?: number;
        bucketHeight?: number;

    }

    export class Grid {

        static create(options: IGridOptions): Grid;
        static update(grid: Grid, bodies: Body[], engine: Engine, forceUpdate: boolean): void;
        static clear(grid: Grid): void;

    }

    export class Pair {

        static create(collision: ICollision, timestamp: number): Pair;
        static update(pair: Pair, collision: ICollision, timestamp: number): void;
        static setActive(pair: Pair, isActive: boolean, timestamp: number): void;
        static id(bodyA: Body, bodyB: Body): number;

    }

    export interface IPairsOptions {

        table?: any;
        list?: any[];
        collisionStart?: any[];
        collisionActive?: any[];
        collisionEnd?: any[];

    }

    export class Pairs {

        static create(options: IPairsOptions): Pairs;
        static update(pairs: Pairs, collisions: ICollision[], timestamp: number): void;
        static removeOld(pairs: Pairs, timestamp: number): void;
        static clear(pairs: Pairs): Pairs;

    }

    export class Query {

        static ray(bodies: Body[], startPoint: Vector, endPoint: Vector, rayWidth?: number): ICollision[];
        static region(bodies: Body[], bounds: Bounds, outside?: boolean): Body[];

    }

    export class Resolver {

        static solvePosition(pairs: Pairs, timeScale: number): void;
        static postSolvePosition(bodies: Body[]): void;
        static preSolveVelocity(pairs: Pairs): void;
        static solveVelocity(pairs: Pairs, timeScale: number): void;

    }

    export class SAT {

        static collides(bodyA: Body, bodyB: Body, previousCollision: ICollision): ICollision;

    }

    export interface IConstraintOptions {

        id?: String;
        type?: string;
        label?: string;
        render?: IRenderer;
        bodyA?: Body;
        bodyB?: Body;
        pointA?: Vector;
        pointB?: Vector;
        stiffness?: boolean;
        length?: number;

    }

    export class Constraint {

        static create(options: IConstraintOptions): Constraint;
        static solveAll(constraints: Constraint[], timeScale: number): void;
        static solve(constraint: Constraint, timeScale: number): void;
        static postSolveAll(bodies: Body[]): void;

        id: number;
        type: string;
        label: string;
        render: IRenderer;
        bodyA: Body;
        bodyB: Body;
        pointA: Vector;
        pointB: Vector;
        stiffness: boolean;
        length: number;

    }

    export interface IMouseConstraint {

        type?: string;
        mouse?: Mouse;
        body?: Body;
        constraint?: Constraint;
        collisionFilter?: ICollisionFilter;

    }

    export class MouseConstraint {

        static create(engine: Engine, options: IMouseConstraint): MouseConstraint;
        static update(mouseConstraint: IMouseConstraint, bodies: Body[]): void;

        mousemove: (event: IEvent) => void;
        mousedown: (event: IEvent) => void;
        mouseup: (event: IEvent) => void;
        startdrag: (event: IEvent) => void;
        enddrag: (event: IEvent) => void;

        type: string;
        mouse: Mouse;
        body: Body;
        constraint: Constraint;
        collisionFilter: ICollisionFilter;

    }

    export class Common {

        static extend(obj: any, deep: boolean): any;
        static clone<T>(obj: T, deep: boolean): T;
        static keys(obj: any): string[];
        static values(obj: any): any[];
        static shadeColor(color: string, percent: number): string;
        static shuffle<T>(array: T[]): T[];
        static choose<T>(choices: T[]): T;
        static isElement(obj: any): boolean;
        static clamp(value: number, min: number, max: number): number;
        static sign(value: number): number;
        static now(): number;
        static random(min: number, max: number): number;
        static colorToNumber(colorString: string): number;
        static log(message: string, type: string): void;
        static nextId(): number;
        static indexOf(haystack: any[], needle: any[]): number;

    }

    export interface IEngineOptions {

        enabled?: boolean;
        positionIterations?: number;
        velocityIterations?: number;
        constraintIterations?: number;
        enableSleeping?: boolean;
        events?: any[];
        timing?: {
            fps?: number;
            timestamp?: number;
            delta?: number;
            correction?: number;
            deltaMin?: number;
            deltaMax?: number;
            timeScale?: number;
            isFixed?: boolean;
            frameRequestId?: number;
        };
        render: Render;
        broadphase: {
            controller?: Grid;
        };

    }

    export class Engine {

        static create(element: Element, options: IEngineOptions): Engine;
        static update(engine: Engine, delta: number, correction?: number): void;
        static render(engine: Engine): void;
        static merge(engineA: Engine, engineB: Engine): void;
        static clear(engine: Engine): void;
        static run(engine: Engine): void;

        enabled: boolean;
        positionIterations: number;
        velocityIterations: number;
        constraintIterations: number;
        enableSleeping: boolean;
        timing: {
            timeScale: number;
            timestamp: number;
            isFixed: boolean;
            delta: number;
            correction: number;
        };
        render: Render;
        grid: Grid;
        world: World;

        //TODO unsure about these
        beforeTick(event: IEvent): void;
        tick(event: IEvent): void;
        beforeUpdate(event: IEvent): void;
        afterUpdate(event: IEvent): void;
        beforeRender(event: IEvent): void;
        afterRender(event: IEvent): void;
        afterTick(event: IEvent): void;
        collisionStart(event: IEvent): void;
        collisionActive(event: IEvent): void;
        collisionEnd(event: IEvent): void;

    }

    export class Events {

        static on(object: any, eventNames: string, callback: Function): Function;
        static off(object: any, eventNames: string, callback: Function): Function;
        static trigger(object: any, eventNames: string, event: any): void;

    }

    export class Metrics {

        static create(): Metrics;
        static reset(metrics: Metrics): void;
        static update(metrics: Metrics, engine: Engine): void;

        extended: boolean;
        narrowDetections: number;
        narrowphaseTests: number;
        narrowReuse: number;
        narrowReuseCount: number;
        midphaseTests: number;
        broadphaseTests: number;
        narrowEff: number;
        midEff: number;
        broadEff: number;
        collisions: number;
        buckets: number;
        bodies: number;
        pairs: number;

    }

    export class Mouse {

        static create(element: HTMLElement): Mouse;
        static setElement(mouse: Mouse, element: HTMLElement): void;
        static clearSourceEvents(mouse: Mouse): void;
        static setOffset(mouse: Mouse, offset: Vector): void;
        static setScale(mouse: Mouse, scale: Vector): void;

        element: HTMLElement;
        absolute: Vector;
        position: Vector;
        mousedownPosition: Vector;
        mouseupPosition: Vector;
        offset: Vector;
        scale: Vector;
        wheelDelta: number;
        button: number;
        sourceEvents: {
            mousemove: any;
            mousedown: any;
            mouseup: any;
            mousewheel: any;
        };
        mousemove(event: any): void;
        mousedown(event: any): void;
        mouseup(event: any): void;
        mousewheel(event: any): void;

    }

    export class Runner {

        static run(engine: Engine): void;
        static stop(engine: Engine): void;

    }

    export class Sleeping {

        static update(bodies: Body[], timeScale: number): void;
        static afterCollision(pairs: Pair[], timeScale: number): void;
        static set(body: Body, isSleeping: boolean): void;

    }

    export class Bodies {

        static rectangle(x: number, y: number, width: number, height: number, options?: IBodyOptions): Body;
        static trapezoid(x: number, y: number, width: number, height: number, slope: number, option?: IBodyOptions): Body;
        static circle(x: number, y: number, radius: number, options?: IBodyOptions, maxSides?: number): Body;
        static polygon(x: number, y: number, sides: number, radius: number, options?: IBodyOptions): Body;

    }

    export class Composites {

        static stack(xx: number, yy: number, columns: number, rows: number, columnGap: number, rowGap: number, callback: Function): Composite;
        static chain(composite: Composite, xOffsetA: number, yOffsetA: number, xOffsetB: number, yOffsetB: number, options?: IConstraintOptions): Composite;
        static mesh(composite: Composite, columns: number, rows: number, crossBrace: boolean, options?: IConstraintOptions): Composite;
        static pyramid(xx: number, yy: number, columns: number, rows: number, columnGap: number, rowGap: number, callback: Function): Composite;
        static newtonsCradle(xx: number, yy: number, number: number, size: number, length: number): Composite;
        static car(xx: number, yy: number, width: number, height: number, wheelSize: number): Composite;
        static softBody(xx: number, yy: number, columns: number, rows: number, columnGap: number, rowGap: number, crossBrace: boolean, particleOptions?: IBodyOptions, constraintOptions?: IConstraintOptions): Composite;

    }

    export class Axes {

        static fromVertices(vertices: Vector[]): Axes;
        static rotate(axes: Axes, angle: number): void;

    }

    export class Bounds {

        static create(vertices: Vector[]): Bounds;
        static update(bounds: Bounds, vertices: Vector[], velocity: Vector): void;
        static contains(bounds: Bounds, point: Vector): boolean;
        static overlaps(boundsA: Bounds, boundsB: Bounds): boolean;
        static translate(bounds: Bounds, vector: Vector): void;
        static shift(bounds: Bounds, position: Vector): void;

        min: Vector;
        max: Vector;

    }

    export class Vector {

        static clone(vector: Vector): Vector;
        static magnitude(vector: Vector): number;
        static magnitudeSquared(vector: Vector): number;
        static rotate(vector: Vector, angle: number): Vector;
        static rotatateAbout(vector: Vector, angle: number, point: Vector): Vector;
        static normalise(vector: Vector): Vector;
        static dot(vectorA: Vector, vectorB: Vector): number;
        static cross(vectorA: Vector, vectorB: Vector): number;
        static add(vectorA: Vector, vectorB: Vector): Vector;
        static sub(vectorA: Vector, vectorB: Vector): Vector;
        static mult(vector: Vector, scalar: number): Vector;
        static div(vector: Vector, scalar: number): Vector;
        static perp(vector: Vector, negate?: boolean): Vector;
        static neg(vector: Vector): Vector;
        static angle(vectorA: Vector, vectorB: Vector): Vector;

        x: number;
        y: number;

    }

    export class Vertices {

        static create(points: Vector[], body: Body): Vertices;
        static fromPath(path: string, body: Body): Vertices;
        static centre(vertices: Vector[]): Vector;
        static area(vertices: Vertices, signed: boolean): number;
        static inertia(vertices: Vertices, mass: number): number;
        static translate(vertices: Vertices, vector: Vector, scalar: number): Vertices;
        static rotate(vertices: Vertices, angle: number, point: Vector): Vertices;
        static contains(vertices: Vertices, point: Vector): boolean;
        static scale(vertices: Vertices, scaleX: number, scaleY: number, point: Vector): Vertices;
        static chamfer(vertices: Vertices, radius: number[], quality: number, qualityMin: number, qualityMax: number): Vertices;

    }

    export interface IRenderOptions {

        width?: number;
        height?: number;
        background?: string;
        wireframeBackground?: string;
        hasBounds?: boolean;
        enabled?: boolean;
        wireframes?: boolean;
        showSleeping?: boolean;
        showDebug?: boolean;
        showBroadphase?: boolean;
        showBounds?: boolean;
        showVelocity?: boolean;
        showCollisions?: boolean;
        showAxes?: boolean;
        showPositions?: boolean;
        showAngleIndicator?: boolean;
        showIds?: boolean;
        showShadows?: boolean;

    }

    export class Render {

        static create(options?: IRenderOptions): Render;
        static clear(render: Render): void;
        static setBackground(render: Render, background: string): void;
        static world(engine: Engine): void;
        static debug(engine: Engine, context: CanvasRenderingContext2D): void;
        static constraints(constraints: Constraint[], context: CanvasRenderingContext2D): void;
        static bodyShadows(engine: Engine, bodies: Body[], context: CanvasRenderingContext2D): void;
        static bodies(engine: Engine, bodies: Body[], context: CanvasRenderingContext2D): void;
        static bodyWireframes(engine: Engine, bodies: Body[], context: CanvasRenderingContext2D): void;
        static bodyBounds(engine: Engine, bodies: Body[], context: CanvasRenderingContext2D): void;
        static bodyAxes(engine: Engine, bodies: Body[], context: CanvasRenderingContext2D): void;
        static bodyPositions(engine: Engine, bodies: Body[], context: CanvasRenderingContext2D): void;
        static bodyVelocity(engine: Engine, bodies: Body[], context: CanvasRenderingContext2D): void;
        static bodyIds(engine: Engine, bodies: Body[], context: CanvasRenderingContext2D): void;
        static collisions(engine: Engine, pairs: Pair[], context: CanvasRenderingContext2D): void;
        static grid(engine: Engine, grid: Grid, context: CanvasRenderingContext2D): void;
        static inspector(inspector: any, context: CanvasRenderingContext2D): void;
        static setPixelRatio(render: Render, pixelRatio: number): void;

        controller: Render;
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        textures: any;
        bounds: Bounds;
        options: IRenderOptions;
        element: HTMLElement;

    }

    export class RenderPixi {

        static create(options?: IRenderOptions): RenderPixi;
        static clear(render: RenderPixi): void;
        static setBackground(render: RenderPixi, background: string): void;
        static world(engine: Engine): void;
        static constraint(engine: Engine, constraint: Constraint): void;
        static body(engine: Engine, body: Body): void;

    }

}