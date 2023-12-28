export const Maps = [
    { value: 'E', label: 'Erangel' },
    { value: 'M', label: 'Miramar' },
    { value: 'T', label: 'Taego' },
    { value: 'V', label: 'Vikendi' }
]

export const getMapName = (code) => {
    switch (code) {
        case 'E':
            return 'Erangel';
            break;
        case 'M':
            return 'Miramar';
            break;
        case 'V':
            return 'Vikendi';
            break;
        case 'T':
            return 'Taego';
            break;
    }
} ;
