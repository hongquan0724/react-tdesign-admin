import {useEffect,useImperativeHandle,forwardRef} from "react";


// eslint-disable-next-line react/display-name
const Tinymce =  forwardRef((props, ref)=>{
        console.log(props)
    useEffect(() => {
        window.tinymce.init({
            selector: 'textarea#basic-example',
            language:'zh_CN',
            height: 360,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
            ],
            toolbar: 'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
            init_instance_callback: editor => {
                editor.on('NodeChange Change KeyUp SetContent', () => {
                    props.getTinymceContent(editor.getContent())
                })
            },
        });
        return () => {
            const tinymce = window.tinymce.get('basic-example');
            tinymce && tinymce.destroy();
        }
    },[])
    const setTinymceContent = (value)=>{
        window.tinymce.get('basic-example').setContent(value)
    }
    useImperativeHandle(ref, () => ({
        setTinymceContent,
    }));
    return (
        <textarea id="basic-example" ></textarea>
    )
});
export default Tinymce