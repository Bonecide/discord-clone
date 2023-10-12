
import * as z from 'zod'

export const formSchema = z.object({
    name : z.string().min(1,{
        message : "Название сервера обязательно к заполнению"
    }),
    imageUrl : z.string().min(1, {
        message: "Изображение обязательно"
    })
})