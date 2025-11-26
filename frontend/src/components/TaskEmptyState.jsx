import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="size-12 mx-auto text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "No active tasks found."
              : filter === "completed"
              ? "No completed tasks found."
              : "No tasks found."}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "Add tasks to get started!"
              : `Move on "all" tab to see tasks ${
                  filter === "active" ? "To be done" : "Active tasks"
                }.`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
