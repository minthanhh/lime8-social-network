export class UserHelper {
  static unblockedListUsers(listBlocked: string[], list: any[]): any[] {
    return list.map((i) => {
      const unblockedUsers: any[] = []
      listBlocked.forEach((id: string) => {
        if (id !== i._id) {
          unblockedUsers.push(i)
        }
      })
      return unblockedUsers
    })
  }
}
