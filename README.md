# sd-a1111-search-by-description-tags
simple extention for automatic1111 to search by description as by a list of tags (LoRa and others)

works only if "Show dirs" checkbox is disabled.

--- how to use ---

1. Enable option for show description for the extra_networks in Automatic1111 settings

Settings > User Interface > Quicksettings list > search for `extra_networks_card_show_desc`

2. Use default search input to search by a set of tags included in the description

-- cards with description: --

1) `style, character, anime, female`
2) `style, character, realistic, female`
3) `character, anime, male`

-- usage: --

Search Input: `anime, character`
=> 1, 3

Search Input: `female, character`
=> 1, 2
