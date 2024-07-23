import updatePostCaption from './updatePostCaption.js';

updatePostCaption("abtg", "3shiejh93rw", "jinx", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post caption update')
})