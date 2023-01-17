import { useEffect, useState } from "@wordpress/element";
import { useEntityRecord } from '@wordpress/core-data';
import { Configuration, OpenAIApi } from "openai"

export const useOpenAI = () => {
    const { hasResolved, record } = useEntityRecord('root', 'site');
    const [openai, setOpenAI] = useState(null);

    useEffect(() => {
        if (!hasResolved || openai) return;

        setOpenAI(new OpenAIApi(new Configuration({
            apiKey: record.openai_api_key
        })));
    }, [hasResolved, record, openai]);

    return openai;
}
