import { Theme } from '@src/style';
import moment from 'moment/moment';

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export function deepTruthyCheck(obj: any) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (!deepTruthyCheck(obj[key])) {
        return false;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if ((typeof obj[key] !== 'boolean' && !obj[key]) || obj[key] === '') {
        return false;
      }
    }
  }
  return true;
}

export function arraysAreEqual(arr1: Array<any> | undefined, arr2: Array<any> | undefined) {
  // Check if both arrays have the same length
  if (!arr1 || !arr2 || arr1.length !== arr2.length) {
    return false;
  }

  // Iterate through each object in the first array
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i];
    let matchingObjFound = false;

    // Compare to each object in the second array
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < arr2.length; j++) {
      const obj2 = arr2[j];

      // If the objects match, continue to next object in the first array
      if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
        matchingObjFound = true;
        break;
      }
    }

    // If no matching object was found in the second array, the arrays are not equal
    if (!matchingObjFound) {
      return false;
    }
  }

  // All objects in the first array were matched to an object in the second array, and arrays are equal
  return true;
}

const staticColors = [
  Theme.colors.primary400,
  Theme.colors.warning400,
  Theme.colors.analogousTeal400,
  Theme.colors.analogousIndigo400,
  Theme.colors.destructive500,
];

export const generateColors = (length: number) => {
  const colors = [];
  for (let i = 0; i < length; i += 1) {
    const color = staticColors[i % staticColors.length];
    colors.push(color);
  }
  return colors;
};

export function camelToKebabCase(camelCaseStr: string) {
  return camelCaseStr.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

export const getTimeInTimeZone = (time: string) => {
  return moment(time).format('LT');
};
