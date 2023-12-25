import { updatePostItem } from 'src/store/slices/post/post.slice'
import Swal from 'sweetalert2'
import { Dispatch } from '@reduxjs/toolkit'
import { updatePostEdit } from 'src/store/slices/post/postEdit.slice'

interface AddFiletoRedux {
  file: File
  dispatch: Dispatch
  type: string
  editModalIsOpen: boolean
}

export class ImageUtils {
  static validateFile(file: File, type: string) {
    if (type.includes('image')) {
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg']
      return file && validImageTypes.indexOf(file.type) > -1
    } else {
      const validVideoTypes = ['video/mp4', 'video/m4v']
      return file && validVideoTypes.indexOf(file.type) > -1
    }
  }
  static checkSizeFile(file: File, type: string) {
    let fileError = ''
    const fileValid = ImageUtils.validateFile(file, type)
    if (!fileValid) {
      fileError = `File ${file.name} không đúng định dạng`
    }
    if (file.size > 50000000) {
      fileError = `File ${file.name} quá lớn`
    }
    return fileError
  }
  static checkFile(file: File, type: string) {
    if (!ImageUtils.validateFile(file, type)) {
      return Swal.fire('Thông báo', `File ${file.name} không đúng định dạng`, 'error')
    }
    if (ImageUtils.checkSizeFile(file, type)) {
      return Swal.fire(ImageUtils.checkSizeFile(file, type))
    }
  }
  static readFileToBase64(file: File): any {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        resolve(reader.result as string)
      })
      reader.addEventListener('error', (event) => {
        reject(event)
      })
      reader.readAsDataURL(file)
    })
  }
  static async addFiletoRedux({ file, dispatch, type, editModalIsOpen }: AddFiletoRedux) {
    ImageUtils.checkFile(file, type)

    const base64 = await ImageUtils.readFileToBase64(file)

    if (editModalIsOpen) {
      dispatch(
        updatePostEdit({
          [type.includes('image') ? 'imagePost' : 'videoPost']: base64
        })
      )
    } else {
      dispatch(
        updatePostItem({
          [type.includes('image') ? 'imagePost' : 'videoPost']: base64
        })
      )
    }
  }
}
