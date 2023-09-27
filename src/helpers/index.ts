export function getShortName(name: string): string {
  let parts = name.split(/\s+/g);

  if ( parts.length > 1 ) {
    return [ parts[0], parts[1] ].map( s => s[0].toUpperCase() ).join('');
  }

  return parts[0].slice(0, 2).toUpperCase();
}