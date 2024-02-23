/**
 * 
 * Search and filtering by tags in description 
 * 
 * b34t aka (beatwaster)
 * 
 * https://github.com/834t/sd-a1111-search-by-description-tags
 *
 */
(()=>{
    const  old_setupExtraNetworksForTab = setupExtraNetworksForTab;
    setupExtraNetworksForTab = function( tabname ){
        old_setupExtraNetworksForTab( tabname );
        var searchDiv = gradioApp().getElementById( tabname + '_extra_search');
        const clonedNode = searchDiv.cloneNode( true );
        clonedNode.id = `${tabname}_extra_search_description_as_tag`;
        clonedNode.classList.remove( 'show-dirs' );
        clonedNode.classList.add( 'search-description-as-tag' );
        clonedNode.innerHTML = `<div><input type="text" width='200' id="${tabname}_extra_search_description_as_tag_input" /></div>`;
        clonedNode.style.color = `inline-block`;
        (new MutationObserver( function( m ){ 
            setTimeout( () => {
                const availableZone = [ 'Lora', 'Checkpoints', 'Hypernetworks', 'Textual Inversion' ];
                let show = false;
                for( const _m of m ){
                    const n1 = _m.addedNodes[0];
                    if( n1 &&  n1.nodeName === 'BUTTON' && n1.classList.contains('selected') && availableZone.includes( n1.innerText ) ){
                        show = true;
                    }
                }
                clonedNode.style.display = show ?  `contents` : `none`;
            }, 150 );
        })).observe( searchDiv.parentNode, { childList:true }  );
        const clonedNodeInput = clonedNode.querySelector( 'input' );
        clonedNodeInput.placeholder = 'tags separated by comma...';
        clonedNodeInput.title = 'filter extranetwork cards by the tags in their description';
        Object.assign( clonedNodeInput.style, {
            "position" : 'relative',
            "outline" : 'none!important',
            "box-shadow" : 'var(--input-shadow)',
            "color" : 'var(--body-text-color)',
            "background" : 'var(--input-background-fill)',
            "padding" : 'var(--input-padding)',
            "margin" : '5px 0px',
            "font-weight" : 'var(--input-text-weight)',
            "font-size" : 'var(--input-text-size)',
            "line-height" : 'var(--line-sm)',
            "border" : 'none',
            "border-radius" : '8px',
        } );

        const useFilter = () => {
            var searchTerm = clonedNodeInput.value.toLowerCase();
            gradioApp().querySelectorAll('#' + tabname + '_extra_tabs div.card').forEach(function(elem) {
                var searchOnly = elem.querySelector('.search_only');
                let search_by_description_as_tags = false;
                if( search_by_description_as_tags || elem.querySelector('.description') ){
                    search_by_description_as_tags = true;
                }
                if( search_by_description_as_tags ){
                    const text_desc = elem.querySelector('.description').textContent.toLowerCase();
                    const disabledByNoDescription = text_desc === '';
                    let search_fit_into_card_tags = !disabledByNoDescription ? true : false;
                    if( search_fit_into_card_tags ){
                        let description_as_tag_list = text_desc.split(',');
                        description_as_tag_list = description_as_tag_list.map( ( a ) => { return a.trim() } );
                        let searchTerm_as_tag_list = searchTerm.split(',');
                        searchTerm_as_tag_list = searchTerm_as_tag_list.map( ( a ) => { return a.trim() } );
                        for( const nextSearch of searchTerm_as_tag_list ){
                            if( description_as_tag_list.indexOf( nextSearch ) == -1 ){
                                search_fit_into_card_tags = false;
                                break;
                            }
                        }
                    }
                    const visible = searchTerm.length < 4 ? true : search_fit_into_card_tags;
                    elem.style.display = visible ? "" : "none";
                } else {
                    var visible = text.indexOf(searchTerm) != -1;
                    if (searchOnly && searchTerm.length < 4) {
                        visible = false;
                        elem.style.display = visible ? "" : "none";
                    }
                    elem.style.display = visible ? "" : "none";
                }
            });
        };
        clonedNodeInput.addEventListener( 'change', () => { useFilter(); } );
        clonedNodeInput.addEventListener( 'input', () => { useFilter(); } );
        searchDiv.parentNode.appendChild( clonedNode );
    }
})()
