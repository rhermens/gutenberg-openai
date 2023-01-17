<?php
/**
 *
 * @link              https://rh-development.nl
 * @since             1.0.0
 * @package           openai
 *
 * @wordpress-plugin
 * Plugin Name:       OpenAI Content generation
 * Plugin URI:        https://rh-development.nl
 * Version:           1.0.0
 * Author:            Roy Hermens
 */

require_once __DIR__ . '/vendor/autoload.php';

use Rhdev\Openai\Options;

(new Options())->register();

add_action('init', function () {
    register_block_type(__DIR__ . "/build/openai-text-block");
});
