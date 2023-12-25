export class UniqueHelper {
  static uniquePropertyInList<T extends Record<string, any>>(list: T[], key: string): T[] {
    return list.filter((i, idx) => idx === 0 || i[key] !== list[idx - 1][key])
  }
}

// export class UniqueHelper {
//   static uniquePropertyInList<T>(list: T[], key: keyof T): T[] {
//     const uniqueValues = new Set<T[keyof T]>()
//     return list.filter((item) => {
//       if (!uniqueValues.has(item[key])) {
//         uniqueValues.add(item[key])
//         return true
//       }
//       return false
//     })
//   }
// }
