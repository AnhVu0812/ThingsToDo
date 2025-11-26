import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎯Great! You are completed {completedTasksCount} task
                {activeTasksCount > 0 &&
                  `, only have ${activeTasksCount} tasks, let's do it`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>Let's begin {activeTasksCount} tasks now! 🚀</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
