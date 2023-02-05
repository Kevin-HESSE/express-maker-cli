const { Model, Datatypes} = require('sequelize');

class <%= modelName  %> extends Model {}

<%= modelName %>.init({
    <% for(const attribute of attributes) { %>
        <%= attribute.attribute %>: { type: Datatypes.<%=attribute.type.toUpperCase() %>,
            allowNull : <%= attribute.allowNull %>
        },
    <% } %>
    }, {
    sequelize,
    modelName: '<%= modelName %>',
    tableName: '<%= options.tableName %>',
    underscored: <%= options.underscored %>,
    timestamps: <%= options.timestamps %>
});

module.exports = <%= modelName %>;

