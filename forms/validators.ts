import { AnyObject } from "yup/lib/types";
import { TestFunction } from "yup/lib/util/createValidation";

export interface IYupTest<TCast, TContext> {
  name: string,
  test: TestFunction<TCast, TContext>
}

const now: Date = new Date(new Date().toDateString());

export const dateInTheFutureValidator: IYupTest<string | undefined, AnyObject> = {
  name: 'ensure_date_in_future',
  test: (date) => {
    const parsedDate = new Date(date!);
    if (parsedDate >= now) return true;
    return false;
  }
};

export const dateStringValidator: IYupTest<string | undefined, AnyObject> = {
  name: 'ensure_date_valid',
  test: (date) => {
    if (date === '' || date === null || date === undefined) return false;

    return true;
  }
};
