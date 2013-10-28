(function ( $ ) {
    
    $.fn.aaseq = function(opt) {
        defaults = {
            groups: 5,
            width: 10,
            properties: {
                A: {name:'Alanine',code:'Ala',polarity:'nonpolar',charge:'neutral'},     
                R: {name:'Arginine',code:'Arg',polarity:'basic-polar',charge:'positive'},        
                N: {name:'Asparagine',code:'Asn',polarity:'polar',charge:'neutral'},        
                D: {name:'Aspartic acid',code:'Asp',polarity:'acidic-polar',charge:'negative'},
                C: {name:'Cysteine',code:'Cys',polarity:'nonpolar',charge:'neutral'},
                E: {name:'Glutamic acid',code:'Glu',polarity:'acidic-polar',charge:'negative'},        
                Q: {name:'Glutamine',code:'Gln',polarity:'polar',charge:'neutral'},        
                G: {name:'Glycine',code:'Gly',polarity:'nonpolar',charge:'neutral'},        
                H: {name:'Histidine',code:'His',polarity:'basic-polar',charge:'positive(10%) neutral(90%)'},
                I: {name:'Isoleucine',code:'Ile',polarity:'nonpolar',charge:'neutral'},     
                L: {name:'Leucine',code:'Leu',polarity:'nonpolar',charge:'neutral'},
                K: {name:'Lysine',code:'Lys',polarity:'basic-polar',charge:'positive'},        
                M: {name:'Methionine',code:'Met',polarity:'nonpolar',charge:'neutral'},     
                F: {name:'Phenylalanine',code:'Phe',polarity:'nonpolar',charge:'neutral'},
                P: {name:'Proline',code:'Pro',polarity:'nonpolar',charge:'neutral'},        
                S: {name:'Serine',code:'Ser',polarity:'polar',charge:'neutral'},        
                T: {name:'Threonine',code:'Thr',polarity:'polar',charge:'neutral'},        
                W: {name:'Tryptophan',code:'Trp',polarity:'nonpolar',charge:'neutral'},
                Y: {name:'Tyrosine',code:'Tyr',polarity:'polar',charge:'neutral'},
                V: {name:'Valine',code:'Val',polar:'nonpolar',charge:'neutral'},
                U: {name:'Selenocysteine',code:'Sec'},
                O: {name:'Pyrrolysine',code:'Pyl'},
                B: {name:'Asparagine or aspartic acid',code:'Asx'},
                Z: {name:'Glutamine or glutamic acid',code:'Glx'},
                J: {name:'Leucine or Isoleucine',code:'Xle'},
                X: {name:'Unspecified or unknown amino acid',code:'Xaa'}
            }
        }; 
        opt = $.extend(defaults,opt);
        var seq = this.text().split(new RegExp('(.{'+opt.width+'})','g')).filter(Boolean).map(function(groupseq,group){
            return (group % opt.groups ? '' : '\n' + '    '.slice(-2+(''+1+group*opt.width).length) + (1+group*opt.width) + ' ') + groupseq.split(/(.{1})/g).filter(Boolean).map(function(amino,offset){
                var pos = 1+group*opt.width+offset;
                var classes = '';
                //For each feature we want to annotate
                for (feature in opt.features) {
                    //Check that the regions defined for that feature lie around the current amino acid
                    for (region in opt.features[feature]) {
                        //If they do add a CSS class for that feature
                        if (pos >= opt.features[feature][region][0] && pos <= opt.features[feature][region][1]) {
                            classes += ' '+feature;
                            break; 
                        }
                    }
                }
                //Output the amino acid with a surrounding span loaded with all the classes and the sequence position as a title
                return '<span title="'+opt.properties[amino].code+'('+pos+')" class="'+amino+classes+' '+opt.properties[amino].polarity+'">'+amino+'</span>';
            }).join('') 
        }).join('&nbsp;');
        
        //Make a header informing people of the offset for each sequence grouping
        var header = '      ';
        //keep track of the previous labels 'eat in' to the offset of spaces
        var prev = 0;
        for (var group = 1; group < opt.groups; group++) {
            //Label text for this group offset
            var label = '+' + group * opt.width;
            //create a load of spaces as wide as the group minus the previous labels contribution
            header += new Array(opt.width + group - prev).join(' ') + label
            header += ' ';
            prev = label.length+group;
        }
        seq = header + seq;
        this.html(seq);
        return this;
    };
    

 
}( jQuery ));
