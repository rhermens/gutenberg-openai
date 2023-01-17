import { RichText, useBlockProps } from "@wordpress/block-editor"

export const Save = ({ attributes }) => {
    const blockProps = useBlockProps.save();

    return <p {...blockProps}>
        <RichText.Content value={attributes.content} />
    </p>
}
