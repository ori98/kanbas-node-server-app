import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {
    // get all assignments
    app.get("/api/assignments", (req, res) => {
        const assignments = Database.assignments;
        res.send(assignments);
    });
    // create a new assignment
    app.post("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const assignment = { ...req.body,
        course: id,
        _id: new Date().getTime().toString() };
        Database.assignments.push(assignment);
        res.send(assignment);
    });
    
    // delete a assignment by id
    app.delete("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        Database.assignments = Database.assignments
        .filter((c) => c._id !== id);
        res.status(204).send(id);
    });
    
    // updating assignments
    app.put("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const assignment = req.body;
        Database.assignments = Database.assignments.map((c) =>
        c._id === id ? { c, ...assignment } : c
        );
        res.send(assignment);
    });
    
    // retrieve a assignment by id
    app.get("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const assignment = Database.assignments
        .filter((c) => c.course === id);
        if (!assignment) {
        res.status(404).send("Assignment not found");
        return;
        }
    
        res.send(assignment);
    });
}