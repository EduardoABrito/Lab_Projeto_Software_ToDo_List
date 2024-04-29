package lab_soft.todo_list.utils;

import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public class DateUtil {
    public static long getDayDifference(Date dateStart, Date dateEnd){
        return ChronoUnit.DAYS.between(dateStart.toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                dateEnd.toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
    }
}
