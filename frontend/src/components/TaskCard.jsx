import React, { use, useState } from "react";
import { Button } from "./ui/button";
import { CheckCircle2, Circle, SquarePen, Trash2 } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

import { Input } from "./ui/input";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task deleted success");
      handleTaskChanged();
    } catch (error) {
      console.error("Delete task error", error);
      toast.error("Error! Can't delete task");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      toast.success(`Task change to ${updateTaskTitle}`);
      handleTaskChanged();
    } catch (error) {
      console.error("Edit task error", error);
      toast.error("Error! Can't edit task");
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if ((task.status = "active")) {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });

        toast.success(`${task.title} has done`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(`${task.title} has changed to active`);
      }
      handleTaskChanged();
    } catch (error) {
      console.error("Update task error", error);
      toast.error("Error! Can't edit task");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/*Circle button*/}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5 " />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/*show or edit title*/}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="what do you need to do?"
              className="flex-1 h-12 text-base boder/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}

          {/*Created day, completed day*/}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/*edit button and delete button*/}
        <div className="hidden gap-2 group-hover:inline-flex animate-up">
          {/*edit button*/}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>

          {/*delete button*/}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
