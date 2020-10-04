var quill = new Quill('#editor', {
    modules: {
        toolbar: '#ql-toolbar'
    },
    theme: 'snow',
    readOnly: false
});   


var Inline = Quill.import('blots/inline');

class LinkBlot extends Inline {
    static create(url) {
        var node = super.create();
        node.setAttribute('href', url);
        node.setAttribute('target', '_blank');
    
        node.addEventListener('click',(evt) => {
            evt.preventDefault();
            range = quill.getSelection();
            if (range) {
                var matches, contact_no, email, link;

                format = quill.getFormat(range.index, range.length);
                matches = format.link.match(/^tel:(.*)/);
                
                if (matches) {
                    contact_no = prompt('Please input your contact number',matches[1]);
                    node.setAttribute('href', 'tel:'+contact_no);
                } 

                if (!matches) {
                    matches = format.link.match(/^mailto:(.*)/);
                    if (matches) {
                        email = prompt('Please input your E-mail',matches[1]);
                        node.setAttribute('href', 'mailto:'+email);
                    }
                }

                if (!matches) {
                    matches = format.link.match(/^(https?:\/\/)(.*)/);
                    if (matches) {
                        link = prompt('Please input your link',matches[1] + matches[2]);
                        node.setAttribute('href', link);
                    }
                }

                console.log(format);
            }
        })

        return node;
    }

    static formats(node) {
        return node.getAttribute('href');
    }
}

LinkBlot.blotName = 'link';
LinkBlot.tagName = 'a';
Quill.register(LinkBlot);

quill.getHTML = function() {
    return quill.root.innerHTML;
};

quill.setHTML = function(html) {
  quill.root.innerHTML = html;
};

var range, format;

function do_action(action) {
    range = quill.getSelection();
    if ((range) && (range.length>0)){ 
        switch (action) {
            case 'h1':
                quill.format('header', 1);
                break;

            case 'h2':
                quill.format('header', 2);
                break;

            case 'h3':
                quill.format('header', 3);
                break;

            case 'h4':
                quill.format('header', 4);
                break;

            case 'bold':
                format = quill.getFormat(range.index, range.length);
                if (!format.bold) {
                    quill.format('bold', true);
                } else {
                    quill.format('bold', false);
                }
                quill.setSelection(range.index + range.length, 0);
                break;

            case 'italic':
                format = quill.getFormat(range.index, range.length);
                if (!format.italic) {
                    quill.format('italic', true);
                } else {
                    quill.format('italic', false);
                }
                quill.setSelection(range.index + range.length, 0);
                break;

            case 'color':
                quill.format('color','#ff0000');
                quill.setSelection(range.index + range.length, 0);
                break;

            case 'hilight':
                quill.format('background','yellow');
                quill.setSelection(range.index + range.length, 0);
                break;

            case 'unordered-list':
                quill.format('list','bullet');
                break; 

            case 'ordered-list':
                quill.format('list','ordered');
                break;

            case 'blockquote':
                format = quill.getFormat(range.index, range.length);
                if (!format.blockquote) {
                    quill.format('blockquote',true); 
                } else {
                    quill.format('blockquote',false);
                };
                break;

            case 'align-left':
                quill.format('align');
                break;

            case 'align-center':
                quill.format('align','center');
                break;

            case 'align-right':
                quill.format('align','right');
                break;

            case 'phone':
                contact_no = prompt('Please input contact number');
                if (contact_no !== null) {
                    quill.format('link', 'tel:' + contact_no);
                    quill.setSelection(range.index + range.length, 0);
                }
                break;

            case 'email':
                email = prompt('Please input E-mail');
                if (email !== null) {
                    quill.format('link','mailto:' + email);
                    quill.setSelection(range.index + range.length, 0);
                }
                break;    

            case 'link':
                link = prompt('Please input link address');
                if (link !== null) {
                    quill.format('link', link);
                    quill.setSelection(range.index + range.length, 0);
                }    
                break;    

            case 'remove-format':
                quill.removeFormat(range.index, range.length);
                break;
        }

    } else {
        switch (action) {
            case 'lorem-ipsum':
                quill.insertText(range.index, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.⁣');
                break;

            case 'unordered-list':
                quill.format('list','bullet');
                break; 

            case 'ordered-list':
                quill.format('list','ordered');
                break;

            case 'blockquote':
                format = quill.getFormat(range.index, range.length);
                if (!format.blockquote) {
                    quill.format('blockquote',true); 
                } else {
                    quill.format('blockquote',false);
                };
                break;

            case 'align-center':
                quill.format('align','center');
                break;

            case 'align-left':
                quill.format('align');
                break;

            case 'align-right':
                quill.format('align','right');
                break;
        }  
    }

    console.log(action)
}

var icon_h1 = document.querySelector('button[data-action=h1]');
icon_h1.addEventListener('click', function(){do_action('h1')});

var icon_h2 = document.querySelector('button[data-action=h2]');
icon_h2.addEventListener('click', function(){do_action('h2')});

var icon_h3 = document.querySelector('button[data-action=h3]');
icon_h3.addEventListener('click', function(){do_action('h3')});

var icon_h4 = document.querySelector('button[data-action=h4]');
icon_h4.addEventListener('click', function(){do_action('h4')});

var icon_bold = document.querySelector('button[data-action=bold]');
icon_bold.addEventListener('click', function(){do_action('bold')});

var icon_italic = document.querySelector('button[data-action=italic]');
icon_italic.addEventListener('click', function(){do_action('italic')});

var icon_blockquote = document.querySelector('button[data-action=blockquote]');
icon_blockquote.addEventListener('click', function(){do_action('blockquote')});

var icon_color = document.querySelector('button[data-action=color');  
icon_color.addEventListener('click', function(){do_action('color')});

var icon_hilight = document.querySelector('button[data-action=hilight');  
icon_hilight.addEventListener('click', function(){do_action('hilight')});

var icon_lorem_ipsum = document.querySelector('button[data-action=lorem-ipsum');  
icon_lorem_ipsum.addEventListener('click', function(){do_action('lorem-ipsum')});

var icon_unordered_list = document.querySelector('button[data-action=unordered-list');  
icon_unordered_list.addEventListener('click', function(){do_action('unordered-list')});

var icon_ordered_list = document.querySelector('button[data-action=ordered-list');  
icon_ordered_list.addEventListener('click', function(){do_action('ordered-list')});

var icon_align_left = document.querySelector('button[data-action=align-left');  
icon_align_left.addEventListener('click', function(){do_action('align-left')});

var icon_align_center = document.querySelector('button[data-action=align-center');  
icon_align_center.addEventListener('click', function(){do_action('align-center')});

var icon_align_right = document.querySelector('button[data-action=align-right');  
icon_align_right.addEventListener('click', function(){do_action('align-right')});

var icon_phone = document.querySelector('button[data-action=phone');  
icon_phone.addEventListener('click', function(){do_action('phone')});

var icon_email = document.querySelector('button[data-action=email');  
icon_email.addEventListener('click', function(){do_action('email')});

var icon_link = document.querySelector('button[data-action=link');  
icon_link.addEventListener('click', function(){do_action('link')});

var icon_remove_format = document.querySelector('button[data-action=remove-format');  
icon_remove_format.addEventListener('click', function(){do_action('remove-format')});