import { useEffect, useState } from 'react';

export default function GanttChart({ tasks }) {
  console.log(tasks);

  useEffect(() => {
    (async () => {
      const options = {
        bar_height: 25, // height of the task bar
        bar_corner_radius: 20, // border radius of bar
        arrow_curve: 10, // curve of the arrow
        padding: 20,
      };
      if (tasks.length) {
        let ganttChart = new Gantt('#gantt', tasks, options);
      }
    })();
  }, [tasks]);

  const styles = (
    <>
      <link
        rel="stylesheet"
        href="/node_modules/frappe-gantt/dist/frappe-gantt.css"
      />
      <style>
        {` 
    .gantt .bar-label {
      font-size: 1.3em;
      }
    .gantt .bar {
      fill: grey;
    }
    svg {
      margin-bottom: -100px;
      // height: 418px;
      overflow-y: auto;
    }
    .gantt-container {
      height: 49vh;
      overflow-y: auto;
    }
    .gantt-container > * {
      overflow-y: auto;
    }
    .grid {
      height: 418px;
      overflow-y: auto;
    }
    /** bar and bar progress of the different color */
/* initial state */
.gantt .bar-wrapper.high .bar {
  fill: hsl(356, 100%, 41%);
}
.gantt .bar-wrapper.high .bar-progress {
  fill: hsl(2, 100%, 77%);
}
.gantt .bar-wrapper.med .bar {
  fill: hsl(32, 82%, 56%);
}
.gantt .bar-wrapper.med .bar-progress {
  fill: hsl(20, 100%, 77%);
}
.gantt .bar-wrapper.low .bar {
  fill: hsl(47, 94%, 66%);
}
.gantt .bar-wrapper.low .bar-progress {
  fill: hsl(50, 100%, 77%);
}

/* hover state */
.gantt .bar-wrapper.high:hover .bar-progress {
  fill: hsl(2, 100%, 77%);
}
.gantt .bar-wrapper.med:hover .bar-progress {
  fill: hsl(20, 100%, 77%);
}
.gantt .bar-wrapper.low:hover .bar-progress {
  fill: hsl(50, 100%, 77%);
}

/* active state */
.gantt .bar-wrapper.high.active .bar {
  fill: hsl(2, 50%, 57%);
}
.gantt .bar-wrapper.high.active .bar-progress {
  fill: hsl(2, 100%, 77%);
}
.gantt .bar-wrapper.med.active .bar {
  fill: hsl(20, 50%, 57%);
}
.gantt .bar-wrapper.med.active .bar-progress {
  fill: hsl(20, 100%, 77%);
}
.gantt .bar-wrapper.low.active .bar {
  fill: hsl(50, 50%, 57%);
}
.gantt .bar-wrapper.low.active .bar-progress {
  fill: hsl(50, 100%, 77%);
}
      `}
      </style>
    </>
  );

  return (
    <>
      <script src="/node_modules/frappe-gantt/dist/frappe-gantt.min.js" />
      {styles}
      <svg id="gantt" ></svg>
    </>
  );
}
