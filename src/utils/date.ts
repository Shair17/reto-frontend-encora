// lang
import 'dayjs/locale/es';

// core
import dayjs from 'dayjs';

// plugins
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

// register plugins
dayjs.extend(utc);
dayjs.locale('es');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export function getFromNow(
  date: dayjs.ConfigType | number,
  withoutSuffix?: boolean,
  isUnix: boolean = true,
) {
  return isUnix
    ? dayjs.unix(date as number).fromNow(withoutSuffix)
    : dayjs(date as dayjs.ConfigType).fromNow(withoutSuffix);
}
