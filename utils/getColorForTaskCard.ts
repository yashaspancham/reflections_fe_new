export const getColorForTask = (taskStatus: string, dueDate: Date) => {
    if (taskStatus === "completed") {
        return "bg-[#fafefa]"; // soft success
    }

    const today = new Date();
    const due = new Date(dueDate);

    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
        return "bg-[#fcfdfa]"; // very calm, plenty of time
    } else if (diffDays > 3) {
        return "bg-[#fffdf1]"; // slightly warm
    } else if (diffDays > 0 && diffDays <= 3) {
        return "bg-[#fff8f0]"; // gently urgent
    } else if (diffDays === 0) {
        return "bg-[#fff5f5]"; // today
    } else if (diffDays < 0 && diffDays >= -3) {
        return "bg-[#fff2f2]"; // just missed
    } else {
        return "bg-[#ffefef]"; // overdue, but still soft
    }
};

// <div className="flex gap-2">
//   <div className="w-20 h-20 rounded-lg bg-[#f0fbf2]" />{" "}
//   {/* light green (completed) */}
//   <div className="w-20 h-20 rounded-lg bg-[#fcfdfa]" />{" "}
//   {/* very light gray (plenty of time) */}
//   <div className="w-20 h-20 rounded-lg bg-[#fffdf0]" />{" "}
//   {/* pale yellow (upcoming) */}
//   <div className="w-20 h-20 rounded-lg bg-[#fff8ef]" />{" "}
//   {/* soft peach (≤3 days) */}
//   <div className="w-20 h-20 rounded-lg bg-[#fff4f4]" />{" "}
//   {/* light pink-red (due today) */}
//   <div className="w-20 h-20 rounded-lg bg-[#fff1f1]" />{" "}
//   {/* very soft red (just missed) */}
//   <div className="w-20 h-20 rounded-lg bg-[#ffecec]" />{" "}
//   {/* slightly stronger pastel red (overdue) */}
// </div>