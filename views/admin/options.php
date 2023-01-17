<div class="wrap">
    <form action="options.php" method="post">
        <?php 
        settings_fields('openai');
        do_settings_sections('openai');
        submit_button();
        ?>
    </form>
</div>
