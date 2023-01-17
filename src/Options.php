<?php

namespace Rhdev\Openai;

class Options 
{

    public function addSettings()
    {
        add_options_page(
            'OpenAI',
            'OpenAI',
            'manage_options',
            'openai',
            [$this, 'render']
        );

        add_settings_section(
            'openai_settings',
            'OpenAI Settings',
            '',
            'openai'
        );

        register_setting(
            'openai',
            'openai_api_key',
            [
                'show_in_rest' => true,
                'sanitize_callback' => 'sanitize_text_field',
            ]
        );

        add_settings_field(
            'openai_api_key',
            'OpenAI API Key',
            function () {
                printf(
                    '<input type="text" name="openai_api_key" value="%s" />',
                    get_option('openai_api_key')
                );
            },
            'openai', 
            'openai_settings'
        );
    }

    public function render()
    {
        ob_start();
        require __DIR__ . '/../views/admin/options.php';

        echo ob_get_clean();
    }



    public function register() 
    {
        add_action('admin_menu', [$this, 'addSettings']);
    }
}
