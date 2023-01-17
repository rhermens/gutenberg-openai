import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, RangeControl, SelectControl, TextControl } from '@wordpress/components';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useOpenAI } from '../hooks/openai';

export const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const openai = useOpenAI();
    const [models, setModels] = useState([]);
    const [completing, setCompleting] = useState(false);

    const modelOptions = useMemo(() => {
        return [
            {
                disabled: true,
                label: __('Select a model', 'openai'),
                value: null
            },
            ...models.map(model => ({
                label: model.id,
                value: model.id
            }))
        ];
    }, [models])

    const getCompletion = async () => {
        setCompleting(true);
        const { prompt, model, max_tokens, risk } = attributes;
        const response = await openai.createCompletion({
            prompt,
            model,
            max_tokens,
            temperature: risk,
        });
        setAttributes({ content: response.data.choices[0].text });
        setCompleting(false);
    }

    useEffect(() => {
        if (!openai) return;

        openai.listModels()
            .then((data) => {
                setModels(data.data.data);
            })
    }, [openai])

    return <>
        <InspectorControls>
            <div id="gutenpride-controls" key="settings">
                <PanelBody title={__('Settings', 'openai')}>
                    <TextControl
                        disabled={!openai}
                        label={__('Prompt', 'openai')}
                        value={attributes.prompt}
                        onChange={(v) => setAttributes({ prompt: v })}
                        />

                    <SelectControl 
                        disabled={!openai}
                        label={__('Model', 'openai')}
                        value={attributes.model}
                        options={modelOptions}
                        onChange={(v) => setAttributes({ model: v })}
                        />

                    <RangeControl
                        label={__('Risk', 'openai')}
                        value={attributes.risk}
                        onChange={(v) => setAttributes({ risk: v })}
                        min={0}
                        max={1}
                        step={0.1}
                        />

                    <RangeControl
                        label={__('Max tokens', 'openai')}
                        value={attributes.max_tokens}
                        onChange={(v) => setAttributes({ max_tokens: v })}
                        min={1}
                        max={2048}
                        step={1}
                        />

                    <Button 
                        onClick={getCompletion}
                        isBusy={completing}
                        disabled={completing}
                        variant="primary">
                        Get completion
                    </Button>
                </PanelBody>
            </div>
        </InspectorControls>

        <RichText 
            {...blockProps}
            value={attributes.content} 
            placeholder="Open block settings to generate text."
            />
    </>;
}
