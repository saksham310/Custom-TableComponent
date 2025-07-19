# Custom-TableComponent

A reusable and customizable Angular table component for displaying, sorting, paginating, and managing tabular data with ease. This component is designed to be easily integrated into Angular applications, supporting features like row selection, sorting, pagination, nested data, and quick actions.

## Features

- **Dynamic Columns**: Accepts custom headers and data to render any table structure.
- **Sorting**: Clickable column headers to sort data ascending/descending.
- **Pagination**: Easily configure rows per page and page navigation.
- **Row Selection**: Supports row highlighting, multi-select with checkboxes, and emits selected rows.
- **Nested Data**: Handles nested object structures within table rows.
- **Custom Focus**: Highlight selected rows with custom colors.
- **Action Toolbar (UI only, not functional)**: Integrated search bar and action buttons (filter, delete) are currently UI elements only and do not perform any actions.

## Usage

### Inputs

- `headers: string[]` – Column names to display as headers.
- `tableData: any[]` – Array of objects to display as table rows.
- `rowsPerPage: number` – Number of rows to display per page.
- `pageLimit: number` – Number of pages to display in the paginator.
- `nestedKey?: { [key: string]: any }` – For accessing nested data.
- `showCheckBox: boolean` – Enable/disable selection checkboxes.
- `enableFocus: boolean` – Enable/disable row highlight on selection.
- `focusColor: string` – Custom highlight color.

### Outputs

- `rowEmitter` – Emits selected row values when a row is selected or changed.

### Example

```html
<app-table
  [headers]="['Name', 'Age', 'Country']"
  [tableData]="userData"
  [rowsPerPage]="10"
  [pageLimit]="5"
  [showCheckBox]="true"
  [enableFocus]="true"
  focusColor="#e4d8ff"
  (rowEmitter)="onSelectedRows($event)">
</app-table>
```

## Action Toolbar

The `<app-table-actions>` component provides a search input, filter, and delete buttons visually.  
> ⚠️ **Note:** These buttons and the search bar are not currently functional—they are UI placeholders only.  
You will need to implement the search, filter, and delete logic yourself to make them interactive.

## Styling

The table comes with a clean, modern style using CSS. You can override styles in your application as required.

## Integration

1. Import the `TableComponent` and `TableActionsComponent` into your Angular module or use them as standalone components.
2. Pass required inputs and handle output events for full control.

## Development

- Written in TypeScript and Angular.
- Easily extensible for more features like advanced filters, export, etc.

## License

This project currently does not specify a license.

---

> **Repository:** [saksham310/Custom-TableComponent](https://github.com/saksham310/Custom-TableComponent)
