class JsonStorage {
  private readonly dataKey = 'Keys'
  private readonly storageKey = 'ExporeList'
  private data: Map<string, unknown[]> = new Map()
  private existData = JSON.parse(localStorage.getItem(this.storageKey) as string)

  constructor() {
    this.initilizeDataCache()
  }

  private async initilizeDataCache() {
    try {
      this.data.set(this.dataKey, [...(this.data.get(this.dataKey) || []), ...this.existData])
    } catch (error) {
      return []
    }
  }

  public addData<T>(newData: T) {
    if (!this.data.has(this.dataKey)) {
      this.data.set(this.dataKey, [])
    }

    const existingData = this.data.get(this.dataKey) || []
    existingData.unshift(newData)

    const data: T[] = this.existData ? this.existData : []
    data.unshift(newData)

    localStorage.setItem(this.storageKey, JSON.stringify(data))

    this.initilizeDataCache()
  }

  /**
   * @function readData Return data
   * @description Get all data in cache
   */
  public readData() {
    return this.data.get(this.dataKey) || []
  }
}

export default new JsonStorage()
