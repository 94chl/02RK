// ["MO 12:00 WE 14:30", "MO 12:00", "MO 15:00", "MO 18:00"],
// ["TU 09:00", "TU 10:00", "TU 15:00", "TU 18:00"],
// ["WE 09:00", "WE 12:00", "WE 15:00", "WE 18:00"],
// ["TH 09:30", "TH 11:30", "TH 15:00", "TH 18:00"],
// ["FR 15:00", "FR 15:00", "FR 15:00", "FR 15:00"]
// time = {
//     startTime: Number,
//     endTime: Number,
//     startDay: String,
//     startTime2: Number,
//     endTime2: Number,
//     startDay2: String,
// }

const days = { MO: 0, TU: 1, WE: 2, TH: 3, FR: 4 };

const makeClassTime = (classInfo) => {
  const target = classInfo.split(" ");
  const isSplitted = target[2] ? true : false;
  const classTime = {
    startDay: target[0],
    startTime: target[1].split(":").reduce((acc, cur) => {
      if (cur == 30) {
        acc = acc + 0.5;
      } else {
        acc = acc + parseInt(cur, 10);
      }
      return acc;
    }, 0),
    startDay2: isSplitted ? target[2] : null,
    startTime2: isSplitted
      ? target[3].split(":").reduce((acc, cur) => {
          if (cur == 30) {
            acc = acc + 0.5;
          } else {
            acc = acc + parseInt(cur, 10);
          }
          return acc;
        }, 0)
      : null,
  };
  return classTime;
};

function solution(schedule) {
  let answer = 0;
  const day = Array(25).fill(0);
  const timeTable = Array(5).fill(day);

  const dfs = (classTime, timeTable, nextSchedule) => {
    const startTimeIndex = classTime.startTime * 2 - 18;
    const endTimeIndex = classTime.startTime2
      ? startTimeIndex + 3
      : startTimeIndex + 6;
    const startTime2Index = classTime.startTime2
      ? classTime.startTime2 * 2 - 18
      : null;
    const endTime2Index = classTime.startTime2 ? startTime2Index + 3 : null;
    const newTimeTable = JSON.parse(JSON.stringify(timeTable));

    let isEmpty =
      newTimeTable[days[classTime.startDay]]
        .slice(startTimeIndex, endTimeIndex)
        .filter((classTime) => classTime > 0).length < 1;
    if (startTime2Index) {
      isEmpty =
        newTimeTable[days[classTime.startDay2]]
          .slice(startTime2Index, endTime2Index)
          .filter((classTime) => classTime > 0).length < 1;
    }
    if (!isEmpty) return;

    for (let i = startTimeIndex; i < endTimeIndex; i++) {
      newTimeTable[days[classTime.startDay]][i] = 1;
    }
    if (startTime2Index) {
      for (let i = startTime2Index; i < endTime2Index; i++) {
        newTimeTable[days[classTime.startDay2]][i] = 1;
      }
    }

    if (nextSchedule.length < 1) {
      answer++;
      return;
    }
    const newNextSchedule = nextSchedule.slice(1);
    for (let i = 0; i < nextSchedule[0].length; i++) {
      const newClassTime = makeClassTime(nextSchedule[0][i]);
      dfs(newClassTime, newTimeTable, newNextSchedule);
    }
  };

  for (let i = 0; i < schedule[0].length; i++) {
    const classTime = makeClassTime(schedule[0][i]);
    const nextSchedule = schedule.slice(1);
    dfs(classTime, timeTable, nextSchedule);
  }

  return answer;
}
