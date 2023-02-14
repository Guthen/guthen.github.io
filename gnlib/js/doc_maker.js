
const docmaker = new Vue( {
    el: ".docmaker",
    data: {
        args: {
            title: { value: "", is_var: true },
            note: { value: "" },
            params: { value: [], is_var: true },
            return: { value: [], is_var: true },
            example: { 
                hyper_text: {
                    prompt: "",
                    code: "",
                    output: "",
                } 
            }
        },
    },
    computed: {
        getOutput() {
            let output = ""

            for ( const k in this.args ) {
                const v = this.args[k]
                if ( v.value === "" || ( v.value instanceof Array && v.value.length === 0 ) || ( v.hyper_text && ( !v.hyper_text.prompt && !v.hyper_text.code && !v.hyper_text.output ) ) ) continue
                
                output += `--- @${k}:\n`
                if ( v.is_var ) {
                    if ( v.value instanceof Array ) {
                        v.value.forEach( _v => {
                            output += `--- \t${_v.value}: <${_v.type}> ${_v.desc}\n`
                        } );
                    }
                    else output += `--- \t${v.value}: <${v.type}> ${v.desc}\n`
                }
                else if ( v.hyper_text ) {
                    const code = v.hyper_text.code.replace( /\n/g, "\\n" ).replace( /\s\s\s\s/g, "\\t" )

                    output += `--- \t#prompt: ${v.hyper_text.prompt}\n`
                    output += `--- \t#code: ${code}\n`
                    output += `--- \t#output: ${v.hyper_text.output}\n`
                }
                else output += `--- \t${v.value}\n`              
            }
            
            return output
        },
    },
} )