import { TaskType } from "@src/services/todo-list/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const ConvertSubTitle = (data: TaskType): string => {
  if (data.type == 1) {
    return format(new Date(data.completionDate!), "dd MMMM yyyy | hh:mm aaa", {
      locale: ptBR,
    });
  }

  if (data.type == 2) {
    return data.days! > 0 ? `${data.days} Dias` : data.status;
  }

  return "Livre";
};
