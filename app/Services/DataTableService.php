<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class DataTableService
{
    public function getJsonResponse(Builder $query, Request $request)
    {
        // Clone the original query to get total records count
        $totalRecordsQuery = clone $query;
        $totalRecords = $totalRecordsQuery->count();

        // Apply searching if any
        $this->applySearch($query, $request);

        // Get the total count after applying searching
        $totalFiltered = $query->count();

        // Apply ordering
        $this->applyOrdering($query, $request);

        // Apply pagination
        $perPage = $request->input('length', 10);
        $currentPage = ceil($request->input('page') - 1 / $perPage) + 1;

        $data = $query->paginate($perPage, ['*'], 'page', $currentPage);
        return [
            'recordsTotal' => $totalRecords,
            'recordsFiltered' => $totalFiltered,
            'data' => $data->items(),
            'pagination' => [
                'currentPage' => $data->currentPage(),
                'perPage' => $data->perPage(),
                'lastPage' => $data->lastPage(),
                'total' => $data->total(),
            ],
        ];
    }

    protected function applySearch(Builder $query, Request $request)
    {
        if ($request->has('columns')) {
            $columns = $request->input('columns');
    
            // Loop through each column in the payload
            foreach ($columns as $column) {
                if ($column['searchable'] && isset($column['search']['value']) && $column['search']['value'] !== '') {
                    $searchValue = $column['search']['value'];
    
                    // Apply the search condition to the specified column
                    $query->orWhere($column['data'], 'like', '%' . $searchValue . '%');
                }
            }
        }
        // if ($request->has('search') && $request->input('search.value')) {
        //     $searchValue = $request->input('search.value');
        //     $query->where(function ($q) use ($searchValue) {
        //         $q->where('name', 'like', '%' . $searchValue . '%')
        //           ->orWhere('email', 'like', '%' . $searchValue . '%');
        //         // Add more fields as needed
        //     });
        // }
    }

    protected function applyOrdering(Builder $query, Request $request)
    {
        if ($request->has('order')) {
            $orderColumn = $request->input('columns')[$request->input('order.0.column')]['data'];
            $orderDirection = $request->input('order.0.dir');
            $query->orderBy($orderColumn, $orderDirection);
        }
    }
}
