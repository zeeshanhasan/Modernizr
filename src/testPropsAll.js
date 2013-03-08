define(['ModernizrProto', 'cssomPrefixes', 'is', 'testProps', 'domPrefixes', 'testDOMProps', 'prefixes'], function( ModernizrProto, cssomPrefixes, is, testProps, domPrefixes, testDOMProps, prefixes ) {
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *     We specify literally ALL possible (known and/or likely) properties on
     *     the element including the non-vendor prefixed one, for forward-
     *     compatibility.
     */
    function testPropsAll( prop, prefixed, elem, value, options ) {

        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' '),
            values = is(value, 'undefined') ? undefined
                   : options && options.prefixValues ? prefixes.join(value + '\n').split('\n').slice(0, -1) : [value];

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
            return testProps(props, prefixed, values, options && options.useValue);

            // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
            props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
            return testDOMProps(props, prefixed, elem);
        }
    }

    // Modernizr.testAllProps() investigates whether a given style property,
    //     or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    ModernizrProto.testAllProps = testPropsAll;

    return testPropsAll;
});
