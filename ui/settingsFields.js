import { ALL_LENGTHS, BASES, changeBase, changeLength, isLengthAvailable, } from '../core/settings.js';
import { h } from './dom.js';
function renderBaseSelect(settings, disabled, onChange) {
    const options = BASES.map((item) => h('option', { value: String(item.base), selected: item.base === settings.base }, item.name));
    const select = h('select', { disabled }, ...options);
    select.onchange = () => onChange(changeBase(settings, Number(select.value)));
    return select;
}
function renderLengthSelect(settings, disabled, onChange) {
    const options = ALL_LENGTHS.map((length) => h('option', {
        value: String(length),
        selected: length === settings.length,
        disabled: !isLengthAvailable(length, settings.base),
    }, String(length)));
    const select = h('select', { disabled }, ...options);
    select.onchange = () => onChange(changeLength(settings, Number(select.value)));
    return select;
}
export function renderSettingsFields(settings, disabled, onChange) {
    return h('div', {}, h('label', {}, 'Система счисления: ', renderBaseSelect(settings, disabled, onChange)), ' ', h('label', {}, 'Длина: ', renderLengthSelect(settings, disabled, onChange)));
}
